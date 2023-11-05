import { replaceStringParams } from '../utils/_index';

/** URLs en la APP. */
export const SiteUrls = {
  /** Home. */
  home: '/',

  /** Auth. */
  auth: {
    login: '/auth/login',
    logout: '/auth/logout'
  },

  /** Accounts. */
  accounts: {
    register: '/accounts/register',
    registerSuccess: '/accounts/register-success',
    registerValidate: '/accounts/register-validate',
    recoveryPassword: '/accounts/recovery-password'
  },

  companySettings: {
    companySettingsDetails: '/company-settings/details'
  },

  companyTasks: {
    list: '/tasks',
    details: '/tasks/{id}/details',
    create: '/tasks/create',
    edit: '/tasks/{id}/edit'
  },

  /** Employees. */
  employees: {
    list: '/employees',
    details: '/employees/{id}/details',
    edit: '/employees/{id}/edit',
    invite: '/employees/invite'
  },

  /** Dashboard. */
  dashboard: {
    dashboard: '/dashboard'
  },

  /** Tests. */
  tests: {
    homeTests: '/tests'
  },

  timeControl: {
    home: '/time-control'
  },

  /** Errors. */
  errors: {
    forbidden: '/errors/403',
    notFound: '/errors/404'
  },

  /**
   * Utiliza una de las propiedades de siteUrls para remplazar {algo} por valor en los args.
   *
   * @param url Una de las propiedades.
   * @param args Remplaza el {key} por el value de.
   */
  replace: (url: string, args: Record<string, string>): string => replaceStringParams(url, args)
};
