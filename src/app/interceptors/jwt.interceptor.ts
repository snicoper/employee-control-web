import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JwtTokenService } from '@services/_index';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly jwtTokenService = inject(JwtTokenService);

  /** RequestData pasados por Headers en todas las peticiones. */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.setAuthorization(request);

    return next.handle(request);
  }

  private setAuthorization(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this.jwtTokenService.getToken();

    if (token && !request.headers.has('Authorization')) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return request;
  }
}
