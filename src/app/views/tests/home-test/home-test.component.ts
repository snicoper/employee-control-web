import { Component, inject } from '@angular/core';
import { logDebug, logError, logInfo, logWarning } from '@aw/core/errors/_index';
import { SimpleGeolocationService } from '@aw/services/simple-geolocation.service';

@Component({
  selector: 'aw-home-test',
  templateUrl: './home-test.component.html'
})
export class HomeTestComponent {
  private readonly simpleGeolocationService = inject(SimpleGeolocationService);

  constructor() {
    this.simpleGeolocationService.getCurrentPosition();
  }

  handleAlertsConsole(): void {
    logError('logError');
    logWarning('logWarning');
    logInfo('logInfo');
    logDebug('logDebug');
  }
}
