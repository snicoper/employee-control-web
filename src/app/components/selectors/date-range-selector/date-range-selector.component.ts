import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { LocalizationUtils } from '../../../core/features/localizations/localization-utils';
import { LocalizationService } from '../../../core/features/localizations/localization.service';

@Component({
  selector: 'aw-date-range-selector',
  standalone: true,
  imports: [FormsModule, NgClass, BsDatepickerModule],
  templateUrl: './date-range-selector.component.html',
  styleUrl: './date-range-selector.component.scss'
})
export class DateRangeSelectorComponent {
  private readonly bsLocaleService = inject(BsLocaleService);
  private readonly localizationService = inject(LocalizationService);

  @Input() startValue = new Date();
  @Input() rangeValue: Date[] = [];
  @Input() maxDate = new Date();
  @Input() disabled = false;
  @Input() bsConfig: Partial<BsDatepickerConfig>;

  @Output() dateRangeValueChange = new EventEmitter<(Date | undefined)[] | undefined>();

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

    this.rangeValue = [this.startValue, this.maxDate];
  }

  handleChangeValue(value: (Date | undefined)[] | undefined): void {
    this.dateRangeValueChange.emit(value);
  }
}
