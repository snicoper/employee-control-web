import { Injectable, signal } from '@angular/core';
import { LocalStorageItems, ThemeColor } from '@core/types/_index';

@Injectable({ providedIn: 'root' })
export class ThemeColorService {
  private readonly theme$ = signal(ThemeColor.auto);

  private colorStorage = ThemeColor.auto;

  initialize(): void {
    this.colorStorage = (localStorage.getItem(LocalStorageItems.theme) as ThemeColor) || ThemeColor.auto;

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
      localStorage.setItem(LocalStorageItems.theme, theme);
    }

    document.documentElement.setAttribute('data-bs-theme', theme);
    this.theme$.set(theme);
  }
}
