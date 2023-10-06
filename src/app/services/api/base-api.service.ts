import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppEnvironments } from '@aw/core/config/_index';
import { Observable } from 'rxjs';

export abstract class BaseApiService {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl = AppEnvironments.baseApiUrl;

  /**
   * Obtener un item por su Id.
   *
   * @param urlPart Parte de la url base a concatenar.
   */
  get<TEntity>(urlPart = ''): Observable<TEntity> {
    urlPart = urlPart.length > 0 ? `/${urlPart}` : '';
    const url = `${this.baseUrl}${urlPart}`;

    return this.http.get<TEntity>(url);
  }

  /**
   * Crea un nuevo item de TEntity.
   *
   * @param entity Tipo entidad.
   * @param urlPart Parte de la url base a concatenar.
   * @returns TEntity creado.
   */
  post<TEntity, TResult>(entity: TEntity, urlPart = ''): Observable<TResult> {
    urlPart = urlPart.length > 0 ? `/${urlPart}` : '';
    const url = `${this.baseUrl}${urlPart}`;

    return this.http.post<TResult>(url, entity);
  }
}
