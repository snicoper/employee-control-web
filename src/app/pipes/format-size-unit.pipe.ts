import { Pipe, PipeTransform } from '@angular/core';
import { FormatUtils } from '@core/utils/_index';

/** Pasar bytes a una medida legible según el size. */
@Pipe({ name: 'formatSizeUnit' })
export class FormatSizeUnitPipe implements PipeTransform {
  transform(size: number): string {
    return FormatUtils.formatSizeUnit(size);
  }
}
