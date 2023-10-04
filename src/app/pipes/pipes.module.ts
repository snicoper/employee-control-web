import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoolToIconPipe } from './bool-to-icon.pipe';
import { FormatSizeUnitPipe } from './format-size-unit.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';

@NgModule({
  declarations: [FormatSizeUnitPipe, TruncateTextPipe, BoolToIconPipe],
  exports: [FormatSizeUnitPipe, TruncateTextPipe, BoolToIconPipe],
  imports: [CommonModule]
})
export class PipesModule {}
