import { Component, Input } from '@angular/core';
import { ApiResult } from '../../../models/_index';

@Component({
  selector: 'aw-table',
  templateUrl: './table.component.html'
})
export class TableComponent<T> {
  @Input() apiResult: ApiResult<T> = new ApiResult<T>();
  @Input() tableResponsive = true;
  @Input() loading = false;
  @Input() tableCss = 'table-hover';
  @Input() showSpinnerLoading = true;
}
