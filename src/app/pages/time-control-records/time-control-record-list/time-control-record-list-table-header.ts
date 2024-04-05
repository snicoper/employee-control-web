import { TableHeaderField } from '../../../components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '../../../core/features/api-result/types/order-type';

export const timeControlRecordListTableHeaders: TableHeaderField[] = [
  {
    field: 'user.firstName',
    text: 'Nombre',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: true
  },
  {
    field: 'user.lastName',
    text: 'Apellidos',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: true
  },
  {
    field: 'start',
    text: 'Apertura',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: false
  },
  {
    field: 'finish',
    text: 'Cierre',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: false
  },
  {
    field: 'closedBy',
    text: 'Cerrado por',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: false
  },
  {
    field: 'timeState',
    text: 'Estado',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: false
  },
  {
    field: 'duration',
    text: 'Duración',
    sortable: false,
    orderType: OrderTypes.None,
    filterable: false
  },

  {
    field: 'incidence',
    text: 'Incidencias',
    sortable: true,
    orderType: OrderTypes.None,
    filterable: false
  },
  {
    field: '',
    text: '',
    sortable: false,
    orderType: OrderTypes.None,
    filterable: false
  }
];
