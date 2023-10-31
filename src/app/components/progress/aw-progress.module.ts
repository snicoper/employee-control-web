import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwDirectivesModule } from '@aw/directives/aw-directives.module';
import { ProgressStackedComponent } from './progress-stacked/progress-stacked.component';

@NgModule({
  declarations: [ProgressStackedComponent],
  imports: [CommonModule, AwDirectivesModule],
  exports: [ProgressStackedComponent]
})
export class AwProgressModule {}
