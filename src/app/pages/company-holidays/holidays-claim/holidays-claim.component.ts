import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CompanyHolidayHeadersComponent } from '../company-holiday-headers/company-holiday-headers.component';

@Component({
  selector: 'aw-holidays-claim',
  templateUrl: './holidays-claim.component.html',
  standalone: true,
  imports: [RouterLink, PageBaseComponent, PageHeaderComponent, CompanyHolidayHeadersComponent]
})
export class HolidaysClaimComponent {
  readonly breadcrumb = new BreadcrumbCollection();
  readonly siteUrl = SiteUrl;

  yearSelected = DateTime.local();

  constructor() {
    this.setBreadcrumb();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Pendientes', SiteUrl.companyHolidays.claims, '', false);
  }
}
