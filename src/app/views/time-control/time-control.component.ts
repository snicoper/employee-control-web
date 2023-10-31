import { Component } from '@angular/core';
import { HtmlItemSelector } from '@aw/core/models/_index';
import { setMonthsSelector, setYearsSelector } from './time-control.utils';

@Component({
  selector: 'aw-time-control',
  templateUrl: './time-control.component.html'
})
export class TimeControlComponent {
  yearsSelector: HtmlItemSelector[] = [];
  yearSelected: HtmlItemSelector | undefined;
  monthsSelector: HtmlItemSelector[] = [];
  monthSelected: HtmlItemSelector | undefined;

  constructor() {
    this.setDefaultValues();
  }

  /** Establecer valores por defecto en los filtros (dropdowns) de año y mes. */
  private setDefaultValues(): void {
    this.yearsSelector = setYearsSelector();
    this.monthsSelector = setMonthsSelector();

    this.yearSelected = this.yearsSelector.find((item) => item.active);
    this.monthSelected = this.monthsSelector.find((item) => item.active);
  }
}
