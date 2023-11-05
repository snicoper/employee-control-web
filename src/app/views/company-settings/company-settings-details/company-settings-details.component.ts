import { Component, computed, inject } from '@angular/core';
import { CurrentCompanyEmployeeService, CurrentCompanySettingsService } from '@aw/services/states/_index';
import { TimeZone, getTimeZones } from '@vvo/tzdb';

@Component({
  selector: 'aw-company-settings-details',
  templateUrl: './company-settings-details.component.html'
})
export class CompanySettingsDetailsComponent {
  private readonly currentCompanySettingsService = inject(CurrentCompanySettingsService);
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);

  readonly companySettings = computed(() => this.currentCompanySettingsService.companySettings());
  readonly loadingCompanySettings = computed(() => this.currentCompanySettingsService.loadingCompanySettings());

  companyName = '';
  timezoneInfo: TimeZone | undefined;

  constructor() {
    this.companyName = this.currentCompanyEmployeeService.getValue()?.name as string;
    this.getCurrentTimezoneInfo();
  }

  getCurrentTimezoneInfo(): void {
    this.timezoneInfo = getTimeZones().find((tz) => tz.name === this.companySettings()?.timezone);
  }
}
