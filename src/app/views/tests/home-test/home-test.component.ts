import { Component, OnInit, inject } from '@angular/core';
import { ApiResult } from '@aw/core/api-result/api-result';
import { logError, logInfo, logSuccess, logWarning } from '@aw/core/errors/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { AdminIdentityPaginated } from '@aw/models/api/_index';
import { AdminIdentityApiService } from '@aw/services/api/_index';

@Component({
  selector: 'aw-home-test',
  templateUrl: './home-test.component.html'
})
export class HomeTestComponent implements OnInit {
  private readonly adminIdentityApiService = inject(AdminIdentityApiService);

  employees: ApiResult<AdminIdentityPaginated> = new ApiResult<AdminIdentityPaginated>();

  ngOnInit(): void {
    this.eventListener();
  }

  handleAlertsConsole(): void {
    logError('Hello world');
    logWarning('Hello world');
    logInfo('Hello world');
    logSuccess('Hello world');
  }

  private eventListener(): void {
    this.adminIdentityApiService
      .get<ApiResult<AdminIdentityPaginated>>(ApiUrls.admin.getAdminIdentitiesPaginated)
      .subscribe({
        next: (result: ApiResult<AdminIdentityPaginated>) => {
          this.employees = result;
        }
      });
  }
}
