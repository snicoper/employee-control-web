import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { logError } from '../core/errors/log-messages';
import { BrowserStorageKey } from '../core/types/browser-storage-key';
import { ThemeColor } from '../core/types/theme-color';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeManagerService {
  private readonly browserStorageService = inject(BrowserStorageService);
  private readonly document = inject(DOCUMENT);

  private readonly theme$ = signal(ThemeColor.Auto);

  private colorStorage = ThemeColor.Auto;

  readonly theme = computed(() => this.theme$());

  initialize(): void {
    this.colorStorage = (this.browserStorageService.get(BrowserStorageKey.Theme) as ThemeColor) || ThemeColor.Auto;

    if (this.colorStorage === ThemeColor.Auto) {
      // Establecer el color del sistema.
      this.colorStorage = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemeColor.Dark
        : ThemeColor.Light;
    }

    this.setTheme(this.colorStorage);
  }

  getThemeValue(): ThemeColor {
    return this.theme$();
  }

  toggle(): void {
    const theme = this.theme$() === ThemeColor.Dark ? ThemeColor.Light : ThemeColor.Dark;
    this.setTheme(theme);
  }

  setTheme(theme: ThemeColor): void {
    if (!this.colorStorage || theme !== this.theme$()) {
      this.browserStorageService.set(BrowserStorageKey.Theme, theme);
    }

    switch (theme) {
      case ThemeColor.Dark:
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        break;
      case ThemeColor.Light:
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        break;
      case ThemeColor.Auto:
        this.initialize();
        break;
      default:
        logError(`ThemeColor (${theme}) no implementado`);
    }

    // Bootstrap theme.
    this.document.documentElement.setAttribute('data-bs-theme', theme.replace('-theme', ''));

    this.theme$.set(theme);
  }
}
