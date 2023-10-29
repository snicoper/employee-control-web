import { replaceStringParams } from '../utils/_index';

/** URLs en la API. */
export const ApiUrls = {
  /** Admin. */
  admin: {
    /** Accounts. */
    accounts: {
      getAdminAccountsPaginated: '/admin/accounts/paginated'
    }
  },

  /** Auth. */
  auth: {
    login: '/auth/login',
    refreshToken: '/auth/refresh-token'
  },

  /** Accounts. */
  accounts: {
    registerAccount: '/accounts/register',
    registerValidateEmail: '/accounts/validate-email',
    emailValidationForwarding: '/accounts/email-validation-forwarding',
    recoveryPassword: '/accounts/recovery-password',
    recoveryPasswordChange: '/accounts/recovery-password-change'
  },

  /** Companies. */
  companies: {
    getCompanyByCurrentUser: '/companies/current-user'
  },

  /** CompanyTasks. */
  companyTasks: {
    getCompanyTasksPaginatedByCompanyId: '/tasks/company/{companyId}/paginated',
    getUsersByCompanyTaskIdPaginated: '/tasks/{id}/employees/paginated',
    createCompanyTask: '/tasks',
    getCompanyTasksById: '/tasks/{id}',
    activateCompanyTask: '/tasks/{id}/activate',
    deactivateCompanyTask: '/tasks/{id}/deactivate',
    updateCompanyTask: '/tasks/{id}'
  },

  /** Employees. */
  employees: {
    getEmployeesPaginated: '/employees/paginated',
    getEmployeeById: '/employees/{id}',
    getRolesByEmployeeId: '/employees/{id}/roles',
    inviteEmployee: '/employees/invite',
    deactivateEmployee: '/employees/{id}/deactivate',
    activateEmployee: '/employees/{id}/activate',
    updateEmployee: '/employees',
    addRoleHumanResources: '/employees/{id}/add-role-rrhh',
    removeRoleHumanResources: '/employees/{id}/remove-role-rrhh'
  },

  /** Localization. */
  localizations: {
    currentLocale: '/localizations/current-locale',
    supportedLocales: '/localizations/supported-locales'
  },

  /**
   * Utiliza una de las propiedades de siteUrls para remplazar {algo} por valor en los args.
   *
   * @param url Una de las propiedades.
   * @param args Remplaza el {key} por el value.
   */
  replace: (url: string, args: Record<string, string>): string => replaceStringParams(url, args)
};
