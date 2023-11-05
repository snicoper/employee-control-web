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
    emailValidationForwarding: '/accounts/resend-email-validation',
    recoveryPassword: '/accounts/recovery-password',
    recoveryPasswordChange: '/accounts/recovery-password-change'
  },

  /** Companies. */
  companies: {
    getCompanyByCurrentUser: '/companies/current-user'
  },

  /** CompanyTasks. */
  companyTasks: {
    getCompanyTasksByCompanyIdPaginated: '/tasks/companies/{companyId}/paginated',
    getEmployeesByCompanyTaskIdPaginated: '/tasks/{id}/employees/paginated',
    getCompanyTasksByEmployeeIdPaginated: '/tasks/employees/{employeeId}/paginated',
    getEmployeesUnassignedTaskByCompanyTaskId: '/tasks/{id}/employees/unassigned',
    getCompanyTasksById: '/tasks/{id}',
    createCompanyTask: '/tasks',
    assignEmployeesToTask: '/tasks/{id}/employees/assign',
    updateCompanyTask: '/tasks/{id}',
    activateCompanyTask: '/tasks/{id}/activate',
    deactivateCompanyTask: '/tasks/{id}/deactivate'
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

  companySettings: {
    getCompanySettingsByCompanyId: '/company-settings/companies/{companyId}',
    updateCompanySettings: '/company-settings'
  },

  identityRoles: {
    getAllIdentityRoles: '/identity-roles'
  },

  /** Localization. */
  localizations: {
    currentLocale: '/localizations/current-locale',
    supportedLocales: '/localizations/supported-locales'
  },

  timeControl: {
    getCurrentStateTimeControl: '/times-control/employees/{employeeId}/time-state',
    getTimeControlRangeByEmployeeId: '/times-control/employees/{employeeId}/from/{from}/to/{to}',
    getTimeStateOpenByEmployeeId: '/times-control/employees/{employeeId}/time-state-open',
    startTimeControl: '/times-control/start',
    finishTimeControl: '/times-control/finish'
  },

  /**
   * Utiliza una de las propiedades de siteUrls para remplazar {algo} por valor en los args.
   *
   * @param url Una de las propiedades.
   * @param args Remplaza el {key} por el value.
   */
  replace: (url: string, args: Record<string, string>): string => replaceStringParams(url, args)
};
