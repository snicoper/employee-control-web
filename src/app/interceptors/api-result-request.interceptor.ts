import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResultItemFilter, ApiResultItemOrderBy } from '../core/api-result/_index';

/** Comprueba si es un ApiResult y deserializa filters. */
@Injectable()
export class ApiResultRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse && event.status === HttpStatusCode.Ok) {
          // Orders de ApiResult.
          if (event.body.hasOwnProperty('orders')) {
            event.body.orders = JSON.parse(event.body.orders) as ApiResultItemOrderBy[];
          }

          // Filtros de ApiResult.
          if (event.body.hasOwnProperty('filters')) {
            event.body.filters = JSON.parse(event.body.filters) as ApiResultItemFilter[];
          }
        }

        return event;
      })
    );
  }
}
