import { Injectable, inject, signal } from '@angular/core';
import { ThemeColor } from '../core/types/_index';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeColorService {
  /** Injects. */
  private localStorageService = inject(LocalStorageService);

  /** Properties. */
  private colorStorage = ThemeColor.auto;

  /** Signals. */
  private readonly theme$ = signal(ThemeColor.auto);

  initialize(): void {
    this.colorStorage = (this.localStorageService.get('theme') as ThemeColor) || ThemeColor.auto;

    if (this.colorStorage === ThemeColor.auto) {
      // Establecer el color del sistema.
      this.colorStorage = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemeColor.dark
        : ThemeColor.light;
    }

    this.setTheme(this.colorStorage);
  }

  getThemeValue(): ThemeColor {
    return this.theme$();
  }

  setTheme(theme: ThemeColor): void {
    if (!this.colorStorage || theme !== this.theme$()) {
      this.localStorageService.set('theme', theme);
    }

    document.documentElement.setAttribute('data-bs-theme', theme);
    this.theme$.set(theme);
  }
}
