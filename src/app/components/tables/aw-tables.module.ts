import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableInputSearchComponent } from './table-input-search/table-input-search.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [CommonModule, AwSpinnerModule],
  declarations: [TableComponent, TableHeaderComponent, TableInputSearchComponent],
  exports: [TableComponent, TableHeaderComponent, TableInputSearchComponent]
})
export class AwTablesModule {}
