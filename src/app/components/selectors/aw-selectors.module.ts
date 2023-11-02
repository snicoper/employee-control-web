import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MonthSelectorComponent } from './month-selector/month-selector.component';
import { TimezoneSelectorComponent } from './timezone-selector/timezone-selector.component';

@NgModule({
  declarations: [TimezoneSelectorComponent, MonthSelectorComponent],
  imports: [CommonModule, FormsModule, NgSelectModule, BsDatepickerModule.forRoot()],
  exports: [TimezoneSelectorComponent, MonthSelectorComponent]
})
export class AwSelectorsModule {}
