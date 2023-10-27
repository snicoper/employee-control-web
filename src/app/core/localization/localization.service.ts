import { Injectable, inject, signal } from '@angular/core';
import { LocalStorageKeys } from '@aw/core/types/local-storage-keys';
import { LocalStorageService } from '@aw/services/_index';
import { DateTime, Settings } from 'luxon';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { DateTimeUtils } from './datetime-utils';
import { LocalesSupported } from './locales-supported';

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly locale$ = signal(DateTimeUtils.defaultLocale);
  private readonly timezone$ = signal(DateTimeUtils.defaultTimezone);

  initialize(locale?: LocalesSupported, timezone?: string): void {
    // Precedencia: localStorage -> parámetro -> defaultLocale.
    locale =
      (this.localStorageService.get(LocalStorageKeys.locale) as LocalesSupported) ??
      locale ??
      DateTime.now().resolvedLocaleOptions().locale;

    timezone = this.localStorageService.get(LocalStorageKeys.timezone) ?? timezone ?? DateTimeUtils.defaultTimezone;

    // La inicialización no contiene los datos de locales supported en el Service por lo que
    // no comprobará la validación.
    this.setLocale(locale);
    this.setTimezone(timezone);
  }

  getLocaleValue(): LocalesSupported {
    return this.locale$();
  }

  getTimezoneValue(): string {
    return this.timezone$();
  }

  setLocale(locale: LocalesSupported): void {
    this.locale$.set(locale);
    Settings.defaultLocale = this.locale$();
    this.localStorageService.set(LocalStorageKeys.locale, this.locale$());

    // Establecer locale en ngx-bootstrap.
    defineLocale(LocalesSupported.es, esLocale);
  }

  setTimezone(timezone: string): void {
    this.timezone$.set(timezone);
    Settings.defaultZone = timezone;
    this.localStorageService.set(LocalStorageKeys.timezone, timezone);
  }
}
