import { TableHeaderField } from './table-header-field.interface';

export class TableHeaderConfig {
  headers: TableHeaderField[] = [];

  /** Añadir un header. */
  addHeader(field: TableHeaderField): this {
    this.headers.push(field);

    return this;
  }

  /** Añadir una lista de header. */
  addHeaders(fields: TableHeaderField[]): this {
    fields.forEach((field) => this.headers.push(field));

    return this;
  }
}
