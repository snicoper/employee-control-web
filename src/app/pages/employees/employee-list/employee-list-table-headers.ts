import { TableHeaderField } from '../../../components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '../../../core/features/api-result/types/order-type';

export const employeeListTableHeaders: TableHeaderField[] = [
  {
    field: 'firstName',
    text: 'Nombre',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: true
  },
  {
    field: 'lastName',
    text: 'Apellidos',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: true
  },
  {
    field: 'email',
    text: 'Correo electrónico',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: true
  },
  {
    field: 'active',
    text: 'Activa',
    sortable: true,
    orderType: OrderTypes.None
  },
  {
    field: 'emailConfirmed',
    text: 'Cuenta aceptada',
    sortable: true,
    orderType: OrderTypes.None
  }
];
