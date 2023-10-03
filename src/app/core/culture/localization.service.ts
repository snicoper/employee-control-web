import { Injectable, effect, signal } from '@angular/core';
import * as dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import { DateTimeUtils } from './datetime-utils';
import { LocalesSupported } from './locales-supported';

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  /** Signals. */
  readonly locale$ = signal(DateTimeUtils.defaultLocale);

  getCultureValue(): LocalesSupported {
    return this.locale$();
  }

  initialise(culture?: LocalesSupported): void {
    if (culture) {
      this.locale$.set(culture);
    }

    this.eventListener();
  }

  private eventListener(): void {
    effect(() => {
      // Establecer locale en dayJs.
      let culture = DateTimeUtils.mapLocaleToDayJs(this.locale$());
      dayjs.locale(culture);

      // Establecer locale en ngx-bootstrap.
      culture = DateTimeUtils.mapLocaleToNgxBootstrap(this.locale$());
      defineLocale(culture, deLocale);
    });
  }
}
