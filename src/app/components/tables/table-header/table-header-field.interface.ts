import { OrderTypes } from '@aw/core/api-result/_index';

export interface TableHeaderField {
  field: string;
  text: string;
  sortable: boolean;
  orderType: OrderTypes;
  orderPrecedence?: number;
  filterable?: boolean;
}
