import { Injectable } from '@angular/core';
import { LocalizationService } from '@core/culture/_index';
import { ThemeColorService } from '@services/_index';

/**
 * Configuración inicial de la aplicación.
 */
@Injectable()
export class AppConfig {
  constructor(
    private themeColorService: ThemeColorService,
    private localizationService: LocalizationService
  ) {
    this.themeColorService.initialize();
    this.localizationService.initialise();
  }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
