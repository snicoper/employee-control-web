import { replaceStringParams } from '../utils/_index';

/** URLs en la API. */
export const ApiUrls = {
  /** Admin. */
  admin: {
    /** Accounts. */
    accounts: {
      getAdminAccountsPaginated: 'admin/accounts/paginated'
    }
  },

  /** Auth. */
  auth: {
    login: 'auth/login',
    refreshToken: 'auth/refresh-token'
  },

  /** Accounts. */
  accounts: {
    registerIdentity: 'accounts/register',
    registerValidateEmail: 'accounts/validate-email',
    emailValidationForwarding: 'accounts/email-validation-forwarding',
    recoveryPassword: 'accounts/recovery-password',
    recoveryPasswordChange: 'accounts/recovery-password-change'
  },

  /** Employees. */
  employees: {
    employeesPaginated: 'employees/paginated',
    inviteEmployee: 'employees/invite'
  },

  /** Localization. */
  localizations: {
    currentLocale: 'localizations/current-locale',
    supportedLocales: 'localizations/supported-locales'
  },

  /**
   * Utiliza una de las propiedades de siteUrls para remplazar {algo} por valor en los args.
   *
   * @param url Una de las propiedades.
   * @param args Remplaza el {key} por el value de.
   */
  replace: (url: string, args: Record<string, string>): string => replaceStringParams(url, args)
};
