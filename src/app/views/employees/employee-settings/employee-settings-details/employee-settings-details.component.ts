import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimeZone, getTimeZones } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import { BreadcrumbCollection } from '../../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../../components/cards/card/card.component';
import { TableLoadingComponent } from '../../../../components/tables/table-loading/table-loading.component';
import { TooltipInfoComponent } from '../../../../components/tooltips/tooltip-info/tooltip-info.component';
import { ViewBaseComponent } from '../../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../../components/views/view-header/view-header.component';
import { SiteUrls } from '../../../../core/urls/_index';
import { EmployeeSettingsStateService } from '../../../../services/states/_index';

@Component({
  selector: 'aw-employee-settings-details',
  templateUrl: './employee-settings-details.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    RouterLink,
    TooltipInfoComponent,
    TableLoadingComponent
  ]
})
export class EmployeeSettingsDetailsComponent {
  private readonly employeeSettingsStateService = inject(EmployeeSettingsStateService);

  readonly employeeSettings = computed(() => this.employeeSettingsStateService.employeeSettings());
  readonly loadingEmployeeSettings = computed(() => this.employeeSettingsStateService.loadingEmployeeSettings());

  readonly breadcrumb = new BreadcrumbCollection();
  nowWithTimezone = '';
  timezoneInfo: TimeZone | undefined;
  siteUrls = SiteUrls;

  constructor() {
    this.setBreadcrumb();
    this.getCurrentTimezoneInfo();
    this.setNowWithOriginalTimezone();
  }

  getCurrentTimezoneInfo(): void {
    this.timezoneInfo = getTimeZones().find((tz) => tz.name === this.employeeSettings()?.timezone);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Configuración de empleado', SiteUrls.employees.settings, '', false);
  }

  private setNowWithOriginalTimezone(): void {
    this.nowWithTimezone = DateTime.local()
      .setZone(this.employeeSettings()?.timezone)
      .toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
  }
}
