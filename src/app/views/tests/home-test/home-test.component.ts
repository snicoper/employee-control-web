import { Component, inject } from '@angular/core';
import { logDebug, logError, logInfo, logWarning } from '@aw/core/errors/_index';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'aw-home-test',
  templateUrl: './home-test.component.html'
})
export class HomeTestComponent {
  private readonly deviceDetectorService = inject(DeviceDetectorService);

  constructor() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
      });
    }
  }

  handleAlertsConsole(): void {
    logError('logError');
    logWarning('logWarning');
    logInfo('logInfo');
    logDebug('logDebug');
  }
}
