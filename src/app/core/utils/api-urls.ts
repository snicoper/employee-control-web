import { replaceStringParams } from './common-utils';

/** URLs en la API. */
export const ApiUrls = {
  /** Admin. */
  admin: {
    /** Identity. */
    getAdminIdentitiesPaginated: 'admin/identity/paginated',
  },

  /** Identity. */
  login: 'identity/login',
  refreshToken: 'identity/refresh-token',

  /** Localization. */
  currentLocale: 'localization/current-locale',
  supportedLocales: 'localization/supported-locales',

  /**
   * Utiliza una de las propiedades de siteUrls para remplazar {algo} por valor en los args.
   *
   * @param url Una de las propiedades.
   * @param args Remplaza el {key} por el value de.
   */
  replace: (url: string, args: Record<string, string>): string => replaceStringParams(url, args)
};
