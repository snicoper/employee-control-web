import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimezoneSelectorComponent } from './timezone-selector/timezone-selector.component';

@NgModule({
  declarations: [TimezoneSelectorComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [TimezoneSelectorComponent]
})
export class AwSelectorsModule {}
