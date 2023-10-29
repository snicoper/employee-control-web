import { Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeaderConfig } from '@aw/components/tables/table-header/table-header.config';
import { ApiResult } from '@aw/core/api-result/api-result';
import { SiteUrls } from '@aw/core/urls/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { CompanyTaskApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';
import { CompanyTaskSelectedService } from '../company-task-selected.service';
import { CompanyTaskUserResponse } from './company-task-users-response.model';
import { companyTaskUsersTableHeaders } from './company-task-users-table-headers';

@Component({
  selector: 'aw-company-task-users',
  templateUrl: './company-task-users.component.html'
})
export class CompanyTaskUsersComponent implements OnInit {
  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly companyTaskSelectedService = inject(CompanyTaskSelectedService);
  private readonly router = inject(Router);

  readonly companyTaskSelected = computed(() => this.companyTaskSelectedService.companyTaskSelected());

  apiResult = new ApiResult<CompanyTaskUserResponse>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;

  ngOnInit(): void {
    this.configureTableHeaders();
    this.loadCompanyTaskUsers();
  }

  handleReloadData(): void {
    this.loadCompanyTaskUsers();
  }

  handleClickClean(event: ApiResult<CompanyTaskUserResponse>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  handleSelectItem(companyTaskUser: CompanyTaskUserResponse): void {
    const url = SiteUrls.replace(SiteUrls.employees.details, { id: companyTaskUser.id });
    this.router.navigateByUrl(url);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(companyTaskUsersTableHeaders);
  }

  private loadCompanyTaskUsers(): void {
    this.loading = true;
    const url = ApiUrls.replace(ApiUrls.companyTasks.getUsersByCompanyTaskIdPaginated, {
      id: this.companyTaskSelectedService.companyTaskSelected()?.id ?? ''
    });

    this.companyTaskApiService
      .getPaginated<CompanyTaskUserResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<CompanyTaskUserResponse>) => {
          this.apiResult = result;
        }
      });
  }
}
