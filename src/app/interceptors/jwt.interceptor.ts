import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenService } from '../services/_index';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private jwtTokenService: JwtTokenService) {}

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
