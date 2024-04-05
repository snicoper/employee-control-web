import { TableHeaderField } from '../../../components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '../../../core/features/api-result/types/order-type';

export const companyTaskListTableHeader: TableHeaderField[] = [
  {
    field: 'name',
    text: 'Nombre',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: true
  },
  {
    field: 'created',
    text: 'Fecha de creación',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: false
  },
  {
    field: 'active',
    text: 'Activa',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: false
  },
  {
    field: 'background',
    text: 'Fondo',
    sortable: false,
    orderType: OrderTypes.None,
    filterable: false
  },
  {
    field: 'color',
    text: 'Texto',
    sortable: false,
    orderType: OrderTypes.None,
    filterable: false
  }
];
