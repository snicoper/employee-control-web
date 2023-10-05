import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationErrors } from '@aw/core/types/_index';
import { SiteUrls, debugErrors, toastForNotificationErrors } from '@aw/core/utils/_index';
import { BadRequestErrors } from '@aw/models/bad-request-errors';
import { JwtService } from '@aw/services/_index';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly jwtService = inject(JwtService);
  private readonly route = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);

  /** Handle error de la aplicación. */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
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

  /** Manejar error de unauthorized. */
  private handleUnauthorized(): void {
    if (!this.jwtService.getToken() || !this.jwtService.getRefreshToken()) {
      this.navigateToLogin();

      return;
    }

    this.jwtService
      .tryRefreshToken()
      .then((result: boolean) => {
        if (!result) {
          this.navigateToLogin();
        }
      })
      .catch((error: Error) => {
        debugErrors(error.message);

        this.navigateToLogin();
      });

    this.router.navigate([SiteUrls.login]);
  }

  /** Manejar error de forbidden.  */
  private handleForbidden(): void {
    this.router.navigate([SiteUrls.errorsForbidden]);
  }

  /** Manejar un BadRequest. */
  private handleBadRequest(errorResponse: HttpErrorResponse): void {
    const errors = errorResponse.error.errors as BadRequestErrors;

    if (Object.hasOwn(errors, ValidationErrors.notificationErrors)) {
      toastForNotificationErrors(errors[ValidationErrors.notificationErrors], this.toastrService);
    }
  }

  /** Errores 500. */
  private handleUnknownError(): void {
    this.toastrService.error(
      `Ha ocurrido un error, por favor si el problema persiste póngase en contacto con la administración.`
    );
  }

  private navigateToLogin(): void {
    this.toastr.error('Requiere autorización para acceder a la página.');
    this.router.navigate([SiteUrls.login], { queryParams: { returnUrl: this.route.url } });
  }
}
