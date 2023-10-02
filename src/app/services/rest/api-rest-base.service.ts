import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEnvironments } from '../../core/utils/_index';

@Injectable({ providedIn: 'root' })
export abstract class ApiRestBaseService {
  protected baseUrl: string;

  constructor(protected http: HttpClient) {
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
  post<TEntity>(entity: TEntity, urlPart = ''): Observable<TEntity> {
    urlPart = urlPart.length > 0 ? `/${urlPart}` : '';
    const url = `${this.baseUrl}${urlPart}`;

    return this.http.post<TEntity>(url, entity);
  }
}
