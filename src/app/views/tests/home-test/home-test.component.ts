import { Component, OnInit, inject } from '@angular/core';
import { ApiResult } from '@aw/core/api-result/api-result';
import { logDebug, logError, logInfo, logWarning } from '@aw/core/errors/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { AdminAccountsPaginatedResponse } from '@aw/models/api/admin/admin-accounts-paginated-response.model';
import { AdminAccountsApiService } from '@aw/services/api/_index';

@Component({
  selector: 'aw-home-test',
  templateUrl: './home-test.component.html'
})
export class HomeTestComponent implements OnInit {
  private readonly adminAccountsApiService = inject(AdminAccountsApiService);

  accounts: ApiResult<AdminAccountsPaginatedResponse> = new ApiResult<AdminAccountsPaginatedResponse>();

  ngOnInit(): void {
    this.eventListener();
  }

  handleAlertsConsole(): void {
    logError('Hello world');
    logWarning('Hello world');
    logInfo('Hello world');
    logDebug('Hello world');
  }

  private eventListener(): void {
    this.adminAccountsApiService
      .getPaginated(this.accounts, ApiUrls.admin.accounts.getAdminAccountsPaginated)
      .subscribe({
        next: (result: ApiResult<AdminAccountsPaginatedResponse>) => {
          this.accounts = result;
        }
      });
  }
}
