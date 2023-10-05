import { Injectable, inject } from '@angular/core';
import { LocalizationService } from '@aw/core/localization/_index';
import { ThemeColorService } from '@aw/services/_index';

/**
 * Configuración inicial de la aplicación.
 */
@Injectable()
export class AppConfig {
  private readonly themeColorService = inject(ThemeColorService);
  private readonly localizationService = inject(LocalizationService);

  constructor() {
    this.themeColorService.initialize();
    this.localizationService.initialize();
  }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
