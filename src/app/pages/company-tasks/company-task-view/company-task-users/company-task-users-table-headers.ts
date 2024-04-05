import { TableHeaderField } from '../../../../components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '../../../../core/features/api-result/types/order-type';

export const companyTaskUsersTableHeaders: TableHeaderField[] = [
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
    text: 'Email',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: true
  }
];
