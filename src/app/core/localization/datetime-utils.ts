import { LocalesSupported } from './locales-supported';

export abstract class DateTimeUtils {
  static readonly defaultLocale = LocalesSupported.esES;
  static readonly defaultTimezone = 'Europe/Madrid';

  /**
   * Mapea una cultura soportada por un locale de ngx-bootstrap.
   *
   * @see https://valor-software.com/ngx-bootstrap/#/components/datepicker?tab=overview#locales
   * @param culture Una valor de LocalesSupported.
   * @returns Valor de locale en base a LocalesSupported.
   */
  static mapLocaleToNgxBootstrap(culture: LocalesSupported): string {
    switch (culture) {
      case LocalesSupported.es:
      case LocalesSupported.esES:
        return LocalesSupported.es;
      case LocalesSupported.en:
        return LocalesSupported.enUS;
      case LocalesSupported.enUS:
        return LocalesSupported.en;
      default:
        return DateTimeUtils.defaultLocale;
    }
  }
}
