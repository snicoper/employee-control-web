import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationErrors } from '@aw/core/types/_index';
import { SiteUrls, debugErrors, debugMessages, toastForNotificationErrors } from '@aw/core/utils/_index';
import { RefreshTokenResponseModel } from '@aw/models/api/_index';
import { BadRequestErrors } from '@aw/models/bad-request-errors';
import { JwtService } from '@aw/services/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, finalize, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);

  /** Handle error de la aplicación. */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        debugErrors(error.message);

        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            return this.handleUnauthorized(request, next);
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
  private handleUnauthorized(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.jwtService.isRefreshing$()) {
      debugMessages('Se va a renovar el token.');

      this.jwtService.refreshedToken$.set(null);
      this.jwtService.isRefreshing$.set(true);

      return this.jwtService.refreshingTokens().pipe(
        finalize(() => this.jwtService.isRefreshing$.set(false)),
        switchMap((result: RefreshTokenResponseModel) => {
          debugMessages('Se a renovado el token.');
          this.jwtService.refreshedToken$.set(result);

          return next.handle(this.addHeaderToken(request, result.accessToken));
        })
      );
    } else {
      const tokens = this.jwtService.refreshedToken$();

      return next.handle(this.addHeaderToken(request, tokens?.accessToken.toString() ?? ''));
    }
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

  private addHeaderToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
