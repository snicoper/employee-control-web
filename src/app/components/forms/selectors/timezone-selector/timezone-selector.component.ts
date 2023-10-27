import { Component, inject } from '@angular/core';
import { LocalizationService } from '@aw/core/localization/localization.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'aw-timezone-selector',
  templateUrl: './timezone-selector.component.html'
})
export class TimezoneSelectorComponent {
  private readonly localizationService = inject(LocalizationService);

  timezoneSelected = this.localizationService.getTimezoneValue();
  timezones = moment.tz.names();

  handleChangeTimezone(): void {
    this.localizationService.setTimezone(this.timezoneSelected);
  }
}
