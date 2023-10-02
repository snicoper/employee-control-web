import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SiteUrls, debugErrors, toastForNotificationErrors } from '../core/utils/_index';

@Injectable()
export class ErrorRequestInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastrService: ToastrService
  ) {}

  /** Handle error de la aplicación. */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        debugErrors(error.error);

        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.handleUnauthorized();
            break;
          case HttpStatusCode.Forbidden:
            this.handleForbidden();
            break;
          case HttpStatusCode.BadRequest:
            this.handleBadRequest(error);
            break;
          default:
            this.handleUnknownError();
        }

        return throwError(() => error);
      })
    );
  }

  /** Manejar error de unauthorized.  */
  private handleUnauthorized(): void {
    // Nothing.
  }

  /** Manejar error de forbidden.  */
  private handleForbidden(): void {
    this.router.navigate([SiteUrls.errorsForbidden]);
  }

  /** En caso de existir notificationErrors, los mostrara con toast. */
  private handleBadRequest(errorResponse: HttpErrorResponse): void {
    toastForNotificationErrors(errorResponse, this.toastrService);
  }

  /** Errores 500. */
  private handleUnknownError(): void {
    this.toastrService.error(`Ha ocurrido un error, por favor si el problema persiste póngase en
      contacto con la administración.`);
  }
}
