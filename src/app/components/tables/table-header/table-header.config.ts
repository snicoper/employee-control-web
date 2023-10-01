import { ITableHeaderField } from './table-header-field.interface';

export class TableHeaderConfig {
  headers: ITableHeaderField[] = [];

  /** Añadir un header. */
  addHeader(field: ITableHeaderField): TableHeaderConfig {
    this.headers.push(field);

    return this;
  }

  /** Añadir una lista de header. */
  addHeaders(fields: ITableHeaderField[]): TableHeaderConfig {
    fields.forEach((field) => this.headers.push(field));

    return this;
  }
}
