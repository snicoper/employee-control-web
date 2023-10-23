import { Component, OnInit, inject } from '@angular/core';
import { TableHeaderConfig } from '@aw/components/tables/table-header/table-header.config';
import { ApiResult } from '@aw/core/api-result/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { EmployeesApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';
import { EmployeeListResponse } from './employee-list-response.model';
import { employeeListTableHeaders } from './employee-list-table-headers';

@Component({
  selector: 'aw-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  private readonly employeesApiService = inject(EmployeesApiService);

  apiResult = new ApiResult<EmployeeListResponse>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;

  ngOnInit(): void {
    this.configureTableHeaders();
    this.loadEmployees();
  }

  handleReloadData(): void {
    this.loadEmployees();
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(employeeListTableHeaders);
  }

  private loadEmployees(): void {
    this.loading = true;
    this.employeesApiService
      .getPaginated<EmployeeListResponse>(this.apiResult, ApiUrls.employees.getEmployeesPaginated)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<EmployeeListResponse>) => {
          this.apiResult = result;
        }
      });
  }
}
