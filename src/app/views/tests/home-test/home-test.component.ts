import { Component } from '@angular/core';
import { logDebug, logError, logInfo, logWarning } from '@aw/core/errors/_index';
import { ApiResult } from '@aw/core/features/api-result/api-result';
import { AdminAccountsPaginatedResponse } from '@aw/models/_index';

@Component({
  selector: 'aw-home-test',
  templateUrl: './home-test.component.html'
})
export class HomeTestComponent {
  readonly accounts: ApiResult<AdminAccountsPaginatedResponse> = new ApiResult<AdminAccountsPaginatedResponse>();
  readonly timezones = Intl.supportedValuesOf('timeZone');

  handleAlertsConsole(): void {
    logError('logError');
    logWarning('logWarning');
    logInfo('logInfo');
    logDebug('logDebug');
  }
}
