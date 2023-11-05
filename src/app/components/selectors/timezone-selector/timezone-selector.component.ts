import { Component, inject } from '@angular/core';
import { LocalizationService } from '@aw/core/features/localizations/_index';
import { timeZonesNames } from '@vvo/tzdb';

@Component({
  selector: 'aw-timezone-selector',
  templateUrl: './timezone-selector.component.html'
})
export class TimezoneSelectorComponent {
  private readonly localizationService = inject(LocalizationService);

  timezones: string[] = timeZonesNames;
  timezoneSelected = this.localizationService.getTimezoneValue();

  handleChangeTimezone(): void {
    this.localizationService.setTimezone(this.timezoneSelected);
  }
}
