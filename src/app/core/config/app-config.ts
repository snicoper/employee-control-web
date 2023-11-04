import { Injectable, inject } from '@angular/core';
import { CurrentTimeControlStateService } from '@aw/models/_index';
import { AuthService, CurrentCompanyEmployeeService, ThemeColorService } from '@aw/services/_index';
import { LocalizationService } from '../features/localizations/_index';

/**
 * Configuración inicial de la aplicación.
 */
@Injectable()
export class AppConfig {
  private readonly themeColorService = inject(ThemeColorService);
  private readonly localizationService = inject(LocalizationService);
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);
  private readonly currentTimeControlStateService = inject(CurrentTimeControlStateService);
  private readonly authService = inject(AuthService);

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.authService.authValue$()) {
        this.currentCompanyEmployeeService.refresh();
        this.currentTimeControlStateService.refresh();
      }

      this.themeColorService.initialize();
      this.localizationService.initialize();

      resolve(true);
    });
  }
}
