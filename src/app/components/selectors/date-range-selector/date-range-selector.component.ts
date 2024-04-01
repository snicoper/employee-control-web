import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { BsDatepickerConfig, BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { LocalizationUtils } from '../../../core/features/localizations/localization-utils';
import { LocalizationService } from '../../../core/features/localizations/localization.service';
import { TooltipDirective } from '../../../directives/tooltip.directive';

@Component({
  selector: 'aw-date-range-selector',
  standalone: true,
  imports: [FormsModule, NgClass, BsDatepickerModule, TooltipDirective],
  templateUrl: './date-range-selector.component.html'
})
export class DateRangeSelectorComponent {
  private readonly bsLocaleService = inject(BsLocaleService);
  private readonly localizationService = inject(LocalizationService);

  @Input() rangeValue = [new Date(), new Date()];
  @Input() maxDate = new Date();
  @Input() isDisabled = false;
  @Input() bsConfig: Partial<BsDatepickerConfig>;

  @Output() dateRangeValueChange = new EventEmitter<(Date | undefined)[] | undefined>();
  @Output() changeState = new EventEmitter<void>();

  /** Evitar el primer emit en handleChangeValue().  */
  private firstChange = true;

  constructor() {
    // Locale BsDatepicker.
    const localeNgxBootstrap = LocalizationUtils.mapLocaleToNgxBootstrap(this.localizationService.getLocaleValue());
    this.bsLocaleService.use(localeNgxBootstrap);

    // Default BsDatepickerConfig.
    this.bsConfig = {
      containerClass: 'theme-default',
      dateInputFormat: 'LL',
      adaptivePosition: true,
      selectWeekDateRange: true
    };
  }

  handleChangeValue(value: (Date | undefined)[] | undefined): void {
    if (this.firstChange) {
      this.firstChange = false;
    } else {
      this.dateRangeValueChange.emit(value);
    }
  }

  handleToggleState(): void {
    this.changeState.emit();
  }

  handleNextRange(): void {
    if (this.isDisabled) {
      return;
    }

    const intervalDays = this.getIntervalDays();
    const start = DateTime.fromJSDate(this.rangeValue[0]).startOf('day');
    const finish = DateTime.fromJSDate(this.rangeValue[1]).endOf('day');
    const newStart = start.plus({ days: intervalDays });
    const newFinish = finish.plus({ days: intervalDays });

    this.rangeValue = [newStart.toJSDate(), newFinish.toJSDate()];
  }

  handlePreviousRange(): void {
    if (this.isDisabled) {
      return;
    }

    const intervalDays = this.getIntervalDays();
    const start = DateTime.fromJSDate(this.rangeValue[0]).startOf('day');
    const finish = DateTime.fromJSDate(this.rangeValue[1]).endOf('day');
    const newStart = start.minus({ days: intervalDays });
    const newFinish = finish.minus({ days: intervalDays });

    this.rangeValue = [newStart.toJSDate(), newFinish.toJSDate()];
  }

  /** Obtener en días la diferencia del rango de fechas. */
  private getIntervalDays(): number {
    const start = DateTime.fromJSDate(this.rangeValue[0]).startOf('day');
    const finish = DateTime.fromJSDate(this.rangeValue[1]).endOf('day');
    const diff = finish.diff(start, ['day']);
    const daysInterval = Math.ceil(diff.days);

    return daysInterval;
  }
}
