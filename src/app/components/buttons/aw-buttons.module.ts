import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwSpinnerModule } from '@components/spinner/aw-spinner.module';
import { BtnLoadingComponent } from './btn-loading/btn-loading.component';

@NgModule({
  imports: [CommonModule, AwSpinnerModule],
  declarations: [BtnLoadingComponent],
  exports: [BtnLoadingComponent]
})
export class AwButtonsModule {}
