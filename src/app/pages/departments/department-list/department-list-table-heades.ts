import { TableHeaderField } from '../../../components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '../../../core/features/api-result/types/order-type';

export const departmentListTableHeaders: TableHeaderField[] = [
  {
    field: 'name',
    text: 'Nombre',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: true
  },
  {
    field: 'active',
    text: 'Activo',
    sortable: true,
    orderType: OrderTypes.None
  },
  {
    field: 'background',
    text: 'Fondo',
    sortable: false,
    orderType: OrderTypes.None
  },
  {
    field: 'color',
    text: 'Color',
    sortable: false,
    orderType: OrderTypes.None
  }
];
