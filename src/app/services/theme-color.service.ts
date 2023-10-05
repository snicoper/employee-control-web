import { Injectable, inject, signal } from '@angular/core';
import { LocalStorageKeys, ThemeColors } from '@aw/core/types/_index';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeColorService {
  private readonly theme$ = signal(ThemeColors.auto);
  private readonly localStorageService = inject(LocalStorageService);

  private colorStorage = ThemeColors.auto;

  initialize(): void {
    this.colorStorage = (this.localStorageService.get(LocalStorageKeys.theme) as ThemeColors) || ThemeColors.auto;

    if (this.colorStorage === ThemeColors.auto) {
      // Establecer el color del sistema.
      this.colorStorage = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemeColors.dark
        : ThemeColors.light;
    }

    this.setTheme(this.colorStorage);
  }

  getThemeValue(): ThemeColors {
    return this.theme$();
  }

  setTheme(theme: ThemeColors): void {
    if (!this.colorStorage || theme !== this.theme$()) {
      this.localStorageService.set(LocalStorageKeys.theme, theme);
    }

    document.documentElement.setAttribute('data-bs-theme', theme);
    this.theme$.set(theme);
  }
}
