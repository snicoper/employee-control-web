import { Injectable } from '@angular/core';
import { ThemeColorService } from '../../services/_index';

/**
 * Configuración inicial de la aplicación.
 */
@Injectable()
export class AppConfig {
  constructor(private themeColorService: ThemeColorService) {
    this.themeColorService.initialize();
  }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
