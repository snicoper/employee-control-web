import { Injectable, inject } from '@angular/core';
import { LocalizationService } from '@aw/core/localization/_index';
import { CurrentCompanyEmployeeService, ThemeColorService } from '@aw/services/_index';

/**
 * Configuración inicial de la aplicación.
 */
@Injectable()
export class AppConfig {
  private readonly themeColorService = inject(ThemeColorService);
  private readonly localizationService = inject(LocalizationService);
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      this.currentCompanyEmployeeService.refresh();
      this.themeColorService.initialize();
      this.localizationService.initialize();

      resolve(true);
    });
  }
}
