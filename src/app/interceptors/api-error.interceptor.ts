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

  /** Manejar error Unauthorized. */
  private handleUnauthorized(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.jwtService.existsTokens()) {
      this.router.navigate([SiteUrls.login]);

      return next.handle(request);
    }

    if (!this.jwtService.isRefreshing$() && this.jwtService.isExpired()) {
      debugMessages('Se va a renovar el token...');

      this.jwtService.refreshedTokens$.set(null);
      this.jwtService.isRefreshing$.set(true);

      return this.jwtService.refreshingTokens().pipe(
        finalize(() => this.jwtService.isRefreshing$.set(false)),
        switchMap((result: RefreshTokenResponseModel) => {
          debugMessages('Se a renovado el token.');
          this.jwtService.refreshedTokens$.set(result);

          return next.handle(this.jwtService.setHeaderAuthorization(request, result.accessToken));
        }),
        catchError((error: HttpErrorResponse) => throwError(() => error))
      );
    } else {
      const tokens = this.jwtService.refreshedTokens$();

      return next.handle(this.jwtService.setHeaderAuthorization(request, tokens?.accessToken.toString() ?? ''));
    }
  }

  /** Manejar error forbidden.  */
  private handleForbidden(): void {
    this.router.navigate([SiteUrls.errorsForbidden]);
  }

  /** Manejar error BadRequest. */
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
}
