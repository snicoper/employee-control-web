import { Injectable } from '@angular/core';

/**
 * Configuración inicial de la aplicación.
 */
@Injectable()
export class AppConfig {
  load(): Promise<boolean> {
    return new Promise((resolve) => {
      // Code here.
      resolve(true);
    });
  }
}
