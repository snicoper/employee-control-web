import { Component } from '@angular/core';
import { DualListBoxItem } from '@aw/components/dual-list-box/dual-list-box-item.model';
import { DualListBoxResponse } from '@aw/components/dual-list-box/dual-list-box-response.model';
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

  dualListBoxItems: DualListBoxItem[] = [];

  constructor() {
    this.dualListBoxItems.push({ key: 1, name: 'Item 1', selected: false });
    this.dualListBoxItems.push({ key: 2, name: 'Item 2', selected: false });
    this.dualListBoxItems.push({ key: 3, name: 'Item 3', selected: true });
    this.dualListBoxItems.push({ key: 4, name: 'Item 4', selected: false });
    this.dualListBoxItems.push({ key: 5, name: 'Item 5', selected: false });
    this.dualListBoxItems.push({ key: 6, name: 'Item 6', selected: true });
    this.dualListBoxItems.push({ key: 7, name: 'Item 7', selected: true });
    this.dualListBoxItems.push({ key: 8, name: 'Item 8', selected: false });
    this.dualListBoxItems.push({ key: 9, name: 'Item 9', selected: false });
    this.dualListBoxItems.push({ key: 10, name: 'Item 10', selected: false });
    this.dualListBoxItems.push({ key: 11, name: 'Item 11', selected: true });
    this.dualListBoxItems.push({ key: 12, name: 'Item 12', selected: false });
    this.dualListBoxItems.push({ key: 13, name: 'Item 13', selected: false });
  }

  handleSaveChanges(dualListBoxResponse: DualListBoxResponse): void {
    console.log(dualListBoxResponse);
  }

  handleAlertsConsole(): void {
    logError('logError');
    logWarning('logWarning');
    logInfo('logInfo');
    logDebug('logDebug');
  }
}
