import { Injectable, effect, inject, signal } from '@angular/core';
import { LocalStorageKeys } from '@aw/core/types/local-storage-keys';
import { LocalStorageService } from '@aw/services/_index';
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

  initialize(locale?: LocalesSupported): void {
    // Precedencia: localStorage -> parámetro -> defaultLocale.
    locale =
      (this.localStorageService.get(LocalStorageKeys.locale) as LocalesSupported) ??
      locale ??
      DateTimeUtils.defaultLocale;

    // La inicialización no contiene los datos de locales supported en el Store por lo que
    // No comprobará la validación.
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
      let locale = DateTimeUtils.mapLocaleToDayJs(this.locale$());
      dayjs.locale(locale);

      // Establecer locale en ngx-bootstrap.
      locale = DateTimeUtils.mapLocaleToNgxBootstrap(this.locale$());
      defineLocale(locale, deLocale);

      // Guardar en localStorage el locale.
      this.localStorageService.set(LocalStorageKeys.locale, this.locale$());
    });
  }
}
