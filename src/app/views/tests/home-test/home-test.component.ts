import { Component } from '@angular/core';
import { ApiResult } from '@aw/core/api-result/api-result';
import { logDebug, logError, logInfo, logWarning } from '@aw/core/errors/_index';
import { AdminAccountsPaginatedResponse } from '@aw/models/api/admin/admin-accounts-paginated-response.model';

@Component({
  selector: 'aw-home-test',
  templateUrl: './home-test.component.html'
})
export class HomeTestComponent {
  accounts: ApiResult<AdminAccountsPaginatedResponse> = new ApiResult<AdminAccountsPaginatedResponse>();
  timezones = Intl.supportedValuesOf('timeZone');

  handleAlertsConsole(): void {
    logError('logError');
    logWarning('logWarning');
    logInfo('logInfo');
    logDebug('logDebug');
  }
}
