import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeColor } from '../core/types/_index';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeColorService {
  private theme$ = new BehaviorSubject<ThemeColor>(ThemeColor.auto);
  private colorStorage = ThemeColor.auto;

  constructor(private localStorageService: LocalStorageService) {}

  get theme(): Observable<ThemeColor> {
    return this.theme$.asObservable();
  }

  get themeValue(): ThemeColor {
    return this.theme$.getValue();
  }

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

  setTheme(theme: ThemeColor): void {
    if (!this.colorStorage || theme !== this.themeValue) {
      this.localStorageService.set('theme', theme);
    }

    document.documentElement.setAttribute('data-bs-theme', theme);
    this.theme$.next(theme);
  }
}
