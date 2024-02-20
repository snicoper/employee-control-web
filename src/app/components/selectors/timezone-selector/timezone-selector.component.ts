import { Component, Input, OnInit, inject } from '@angular/core';
import { LocalizationService } from '@aw/core/features/localizations/_index';
import { timeZonesNames } from '@vvo/tzdb';

@Component({
  selector: 'aw-timezone-selector',
  templateUrl: './timezone-selector.component.html'
})
export class TimezoneSelectorComponent implements OnInit {
  private readonly localizationService = inject(LocalizationService);

  @Input() timezoneSelected = '';

  timezones: string[] = timeZonesNames;

  ngOnInit(): void {
    this.timezoneSelected = this.timezoneSelected ?? this.localizationService.getTimezoneValue();
  }

  handleChangeTimezone(): void {
    this.localizationService.setTimezone(this.timezoneSelected);
  }
}
