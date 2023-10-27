import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeaderConfig } from '@aw/components/tables/table-header/table-header.config';
import { ApiResult } from '@aw/core/api-result/api-result';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { CompanyTaskApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';
import { CurrentCompanyEmployeeService } from './../../../services/current-company-employee.service';
import { CompanyTaskListResponse } from './company-task-list-response.model';
import { companyTaskListTableHeader } from './company-task-list-table-headers';

@Component({
  selector: 'aw-company-tasks-list',
  templateUrl: './company-task-list.component.html'
})
export class CompanyTaskListComponent {
  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly router = inject(Router);
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);

  apiResult = new ApiResult<CompanyTaskListResponse>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;
  siteUrls = SiteUrls;

  constructor() {
    this.configureTableHeaders();
    this.loadCompanyTasks();
  }

  handleReloadData(): void {
    this.loadCompanyTasks();
  }

  handleFilterChange(event: ApiResult<CompanyTaskListResponse>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  handleSelectItem(companyTask: CompanyTaskListResponse): void {
    const url = SiteUrls.replace(SiteUrls.companyTasks.details, { id: companyTask.id.toString() });
    this.router.navigateByUrl(url);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(companyTaskListTableHeader);
  }

  private loadCompanyTasks(): void {
    this.loading = true;
    const url = ApiUrls.replace(ApiUrls.companyTasks.getCompanyTasksPaginatedByCompanyId, {
      companyId: this.currentCompanyEmployeeService.getValue()?.id.toString() ?? ''
    });

    this.companyTaskApiService
      .getPaginated<CompanyTaskListResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<CompanyTaskListResponse>) => {
          this.apiResult = result;
        }
      });
  }
}
