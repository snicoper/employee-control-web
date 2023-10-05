import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppEnvironments } from '@aw/core/utils/_index';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class ApiRestBaseService {
  protected readonly http = inject(HttpClient);

  protected baseUrl: string;

  constructor() {
    this.baseUrl = AppEnvironments.baseApiUrl;
  }

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
