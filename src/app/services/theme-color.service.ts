import { Injectable, computed, inject, signal } from '@angular/core';
import { LocalStorageKeys } from '../core/types/local-storage-keys';
import { ThemeColors } from '../core/types/theme-colors';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeColorService {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly theme$ = signal(ThemeColors.Auto);

  readonly theme = computed(() => this.theme$());

  private colorStorage = ThemeColors.Auto;

  initialize(): void {
    this.colorStorage = (this.localStorageService.get(LocalStorageKeys.Theme) as ThemeColors) || ThemeColors.Auto;

    if (this.colorStorage === ThemeColors.Auto) {
      // Establecer el color del sistema.
      this.colorStorage = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemeColors.Dark
        : ThemeColors.Light;
    }

    this.setTheme(this.colorStorage);
  }

  getThemeValue(): ThemeColors {
    return this.theme$();
  }

  toggle(): void {
    const theme = this.theme$() === ThemeColors.Dark ? ThemeColors.Light : ThemeColors.Dark;
    this.setTheme(theme);
  }

  setTheme(theme: ThemeColors): void {
    if (!this.colorStorage || theme !== this.theme$()) {
      this.localStorageService.set(LocalStorageKeys.Theme, theme);
    }

    document.documentElement.setAttribute('data-bs-theme', theme);
    this.theme$.set(theme);
  }
}
