import { OrderTypes } from '../../../core/api-result/_index';

export interface ITableHeaderField {
  field: string;
  text: string;
  sortable: boolean;
  orderType: OrderTypes;
  orderPrecedence?: number;
  filterable?: boolean;
}
