import { Component, inject } from '@angular/core';
import { ApiResult } from '@aw/core/api-result/api-result';
import { logDebug, logError, logInfo, logWarning } from '@aw/core/errors/_index';
import { AdminAccountsPaginatedResponse } from '@aw/models/api/admin/admin-accounts-paginated-response.model';
import { AdminAccountsApiService } from '@aw/services/api/_index';

@Component({
  selector: 'aw-home-test',
  templateUrl: './home-test.component.html'
})
export class HomeTestComponent {
  private readonly adminAccountsApiService = inject(AdminAccountsApiService);

  accounts: ApiResult<AdminAccountsPaginatedResponse> = new ApiResult<AdminAccountsPaginatedResponse>();

  handleAlertsConsole(): void {
    logError('logError');
    logWarning('logWarning');
    logInfo('logInfo');
    logDebug('logDebug');
  }
}
