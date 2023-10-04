import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LocalizationService } from '@core/localization/localization.service';
import { Observable } from 'rxjs';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  private readonly localizationService = inject(LocalizationService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.headers.has('Accept-Language')) {
      request = request.clone({
        headers: request.headers.set('Accept-Language', this.localizationService.locale$())
      });
    }

    return next.handle(request);
  }
}
