import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoolToIconPipe } from './bool-to-icon.pipe';
import { DatetimeFormatPipe } from './datetime-format.pipe';
import { DatetimePipe } from './datetime.pipe';
import { FormatSizeUnitPipe } from './format-size-unit.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';

@NgModule({
  declarations: [FormatSizeUnitPipe, TruncateTextPipe, BoolToIconPipe, DatetimePipe, DatetimeFormatPipe],
  exports: [FormatSizeUnitPipe, TruncateTextPipe, BoolToIconPipe, DatetimePipe, DatetimeFormatPipe],
  imports: [CommonModule]
})
export class AwPipesModule {}
