import { Injectable, effect, inject, signal } from '@angular/core';
import { LocalStorageKeys } from '@core/types/local-storage-keys';
import { LocalStorageService } from '@services/_index';
import * as dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import { DateTimeUtils } from './datetime-utils';
import { LocalesSupported } from './locales-supported';

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly locale$ = signal<LocalesSupported>(DateTimeUtils.defaultLocale);

  initialise(locale?: LocalesSupported): void {
    // Precedencia: localStorage -> parámetro -> defaultLocale.
    locale =
      (this.localStorageService.get(LocalStorageKeys.locale) as LocalesSupported) ??
      locale ??
      DateTimeUtils.defaultLocale;

    this.setLocale(locale);
    this.eventListener();
  }

  getLocaleValue(): LocalesSupported {
    return this.locale$();
  }

  setLocale(locale: LocalesSupported): void {
    this.locale$.set(locale);
  }

  private eventListener(): void {
    effect(() => {
      // Establecer locale en dayJs.
      let culture = DateTimeUtils.mapLocaleToDayJs(this.locale$());
      dayjs.locale(culture);

      // Establecer locale en ngx-bootstrap.
      culture = DateTimeUtils.mapLocaleToNgxBootstrap(this.locale$());
      defineLocale(culture, deLocale);

      // Guardar en localStorage el locale.
      this.localStorageService.set(LocalStorageKeys.locale, this.locale$());
    });
  }
}
