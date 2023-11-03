import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiResult, LogicalOperators, RelationalOperators } from '@aw/core/features/api-result/_index';
import { TableHeaderField } from '../table-header/table-header-field.interface';
import { TableHeaderConfig } from '../table-header/table-header.config';

@Component({
  selector: 'aw-table-input-search',
  templateUrl: './table-input-search.component.html'
})
export class TableInputSearchComponent<T> {
  @Input({ required: true }) tableHeaderConfig = new TableHeaderConfig();
  @Input({ required: true }) apiResult = new ApiResult<T>();

  @Output() clickClean = new EventEmitter<ApiResult<T>>();

  private originalPageNumber = 3;

  term = '';

  handleInputChange(event: Event): void {
    this.apiResult = ApiResult.clone(this.apiResult);
    this.apiResult.cleanFilters();
    this.term = String(event);

    // Las búsquedas siempre lo hace desde la pagina 1.
    if (this.term.length > 0) {
      this.apiResult.pageNumber = 1;
    }

    this.tableHeaderConfig.headers.forEach((element: TableHeaderField) => {
      if (element.filterable) {
        const logicalOperator = this.apiResult.filters.length === 0 ? LogicalOperators.none : LogicalOperators.or;
        this.apiResult.addFilter(element.field, RelationalOperators.contains, this.term, logicalOperator);
      }
    });

    this.clickClean.emit(this.apiResult);
  }
}
