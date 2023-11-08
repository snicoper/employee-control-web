import { TableHeaderField } from '@aw/components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '@aw/core/features/api-result/_index';

export const timeControlRecordListTableHeaders: TableHeaderField[] = [
  {
    field: 'firstName',
    text: 'Nombre',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: true
  },
  {
    field: 'lastName',
    text: 'Apellidos',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: true
  },
  {
    field: 'start',
    text: 'Apertura',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: false
  },
  {
    field: 'finish',
    text: 'Cierre',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: false
  },
  {
    field: 'duration',
    text: 'Duración',
    sortable: false,
    orderType: OrderTypes.none,
    filterable: false
  },
  {
    field: 'closedBy',
    text: 'Cerrado por',
    sortable: false,
    orderType: OrderTypes.none,
    filterable: false
  },
  {
    field: 'duration',
    text: 'Duración',
    sortable: false,
    orderType: OrderTypes.none,
    filterable: false
  }
];
