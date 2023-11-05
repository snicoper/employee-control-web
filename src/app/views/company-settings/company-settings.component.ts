import { Component, computed, inject } from '@angular/core';
import { CurrentCompanyEmployeeService, CurrentCompanySettingsService } from '@aw/services/states/_index';

@Component({
  selector: 'aw-company-settings',
  templateUrl: './company-settings.component.html'
})
export class CompanySettingsComponent {
  private readonly currentCompanySettingsService = inject(CurrentCompanySettingsService);
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);

  readonly companySettings = computed(() => this.currentCompanySettingsService.companySettings());

  companyName = '';

  constructor() {
    this.companyName = this.currentCompanyEmployeeService.getValue()?.name as string;
  }
}
