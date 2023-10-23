import { TableHeaderField } from '@aw/components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '@aw/core/api-result/_index';

export const employeeListTableHeaders: TableHeaderField[] = [
  {
    field: 'firstName',
    text: 'Nombre',
    sortable: true,
    orderType: OrderTypes.none
  },
  {
    field: 'lastName',
    text: 'Apellidos',
    sortable: true,
    orderType: OrderTypes.none
  },
  {
    field: 'email',
    text: 'Correo electrónico',
    sortable: true,
    orderType: OrderTypes.none
  }
];
