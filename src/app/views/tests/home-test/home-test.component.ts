import { Component } from '@angular/core';
import { ApiResult } from '@aw/core/api-result/api-result';
import { logDebug, logError, logInfo, logWarning } from '@aw/core/errors/_index';
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
