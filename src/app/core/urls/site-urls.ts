/** URLs en la APP. */
export const SiteUrls = {
  home: '/',

  auth: {
    login: '/auth/login',
    logout: '/auth/logout'
  },

  categoryAbsences: {
    list: '/category-absence',
    create: '/category-absence/create',
    edit: '/category-absence/{id}/edit'
  },

  accounts: {
    register: '/accounts/register',
    registerSuccess: '/account/register-success',
    registerValidate: '/account/register-validate',
    recoveryPassword: '/account/recovery-password'
  },

  companySettings: {
    details: '/company-setting/details',
    edit: '/company-setting/edit'
  },

  companyTasks: {
    list: '/task',
    details: '/task/{id}',
    create: '/task/create',
    edit: '/task/{id}/edit'
  },

  departments: {
    list: '/department',
    details: '/department/{id}',
    create: '/department/create',
    edit: '/department/{id}/edit'
  },

  employees: {
    list: '/employee',
    details: '/employee/{id}',
    edit: '/employee/{id}/edit',
    invite: '/employee/invite',
    settings: '/employee/settings',
    settingsEdit: '/employee/settings/edit'
  },

  dashboard: {
    dashboard: '/dashboard'
  },

  tests: {
    homeTests: '/test'
  },

  timeControlRecords: {
    home: '/time-control-record',
    create: '/time-control-record/create'
  },

  timeControl: {
    home: '/time-control'
  },

  errors: {
    forbidden: '/error/403',
    notFound: '/error/404'
  }
};
