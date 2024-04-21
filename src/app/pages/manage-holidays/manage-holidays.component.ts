import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbCollection } from '../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../components/pages/page-header/page-header.component';
import { SiteUrl } from '../../core/urls/site-urls';
import { EmployeeHolidaysApiService } from '../../services/api/employee-holidays-api.service';

@Component({
  selector: 'aw-manage-holidays',
  templateUrl: './manage-holidays.component.html',
  styleUrl: './manage-holidays.component.scss',
  standalone: true,
  imports: [MatCardModule, PageBaseComponent, PageHeaderComponent]
})
export class ManageHolidaysComponent {
  private readonly employeeHolidaysApiService = inject(EmployeeHolidaysApiService);

  readonly breadcrumb = new BreadcrumbCollection();

  constructor() {
    this.setBreadcrumb();
    this.loadEmployeeHolidays();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Días festivos', SiteUrl.manageHolidays.manage, '', false);
  }

  private loadEmployeeHolidays(): void {}
}
