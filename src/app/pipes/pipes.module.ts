import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoolToIconPipe } from './bool-to-icon.pipe';
import { DatetimePipe } from './datetime.pipe';
import { FormatSizeUnitPipe } from './format-size-unit.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';

@NgModule({
  declarations: [FormatSizeUnitPipe, TruncateTextPipe, BoolToIconPipe, DatetimePipe],
  exports: [FormatSizeUnitPipe, TruncateTextPipe, BoolToIconPipe, DatetimePipe],
  imports: [CommonModule]
})
export class PipesModule {}
