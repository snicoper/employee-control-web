import { TableHeaderField } from '../../../../components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '../../../../core/features/api-result/types/order-type';

export const employeeTasksTableHeaders: TableHeaderField[] = [
  {
    field: 'name',
    text: 'Nombre',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: true
  },
  {
    field: 'active',
    text: 'Activa',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: false
  }
];
