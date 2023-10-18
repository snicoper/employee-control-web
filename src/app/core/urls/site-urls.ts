import { replaceStringParams } from '../utils/_index';

/** URLs en la APP. */
export const SiteUrls = {
  /** Home. */
  home: '/',

  /** Auth. */
  login: '/auth/login',

  /** identity. */
  register: '/identity/register',
  registerSuccess: '/identity/register-success',
  registerValidate: '/identity/register-validate',
  recoveryPassword: '/identity/recovery-password',

  /** Dashboard. */
  dashboard: '/dashboard',

  /** Tests. */
  homeTests: '/tests',

  /** Errors. */
  errorsForbidden: '/errors/403',
  errorsNotFound: '/errors/404',

  /**
   * Utiliza una de las propiedades de siteUrls para remplazar {algo} por valor en los args.
   *
   * @param url Una de las propiedades.
   * @param args Remplaza el {key} por el value de.
   */
  replace: (url: string, args: Record<string, string>): string => replaceStringParams(url, args)
};
