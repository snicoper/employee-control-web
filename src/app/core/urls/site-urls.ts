import { replaceStringParams } from '../utils/_index';

/** URLs en la APP. */
export const SiteUrls = {
  home: '/',

  auth: {
    login: '/auth/login',
    logout: '/auth/logout'
  },

  accounts: {
    register: '/accounts/register',
    registerSuccess: '/accounts/register-success',
    registerValidate: '/accounts/register-validate',
    recoveryPassword: '/accounts/recovery-password'
  },

  companySettings: {
    details: '/company-settings/details',
    edit: '/company-settings/edit'
  },

  companyTasks: {
    list: '/tasks',
    details: '/tasks/{id}/details',
    create: '/tasks/create',
    edit: '/tasks/{id}/edit'
  },

  departments: {
    list: '/departments',
    details: '/departments/{id}/details',
    create: '/departments/create',
    edit: '/departments/{id}/edit'
  },

  employees: {
    list: '/employees',
    details: '/employees/{id}/details',
    edit: '/employees/{id}/edit',
    invite: '/employees/invite'
  },

  dashboard: {
    dashboard: '/dashboard'
  },

  tests: {
    homeTests: '/tests'
  },

  timeControl: {
    home: '/time-control'
  },

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
