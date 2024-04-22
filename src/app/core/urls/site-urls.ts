/** URLs en la APP. */
export const SiteUrl = {
  home: '/',

  accounts: {
    register: '/accounts/register',
    registerSuccess: '/accounts/register-success',
    registerValidate: '/accounts/register-validate',
    recoveryPassword: '/accounts/recovery-password'
  },

  auth: {
    login: '/auth/login',
    logout: '/auth/logout'
  },

  categoryAbsences: {
    list: '/category-absences',
    create: '/category-absences/create',
    update: '/category-absences/{id}/update'
  },

  companyCalendar: {
    calendar: '/company-calendar'
  },

  companySettings: {
    details: '/company-settings',
    update: '/company-settings/update'
  },

  companyTasks: {
    list: '/tasks',
    details: '/tasks/{id}',
    create: '/tasks/create',
    update: '/tasks/{id}/update'
  },

  dashboard: {
    dashboard: '/dashboard'
  },

  employeeSettings: {
    settings: '/employee-settings',
    update: '/employee-settings/update'
  },

  departments: {
    list: '/departments',
    details: '/departments/{id}',
    create: '/departments/create',
    update: '/departments/{id}/update'
  },

  employees: {
    list: '/employees',
    details: '/employees/{id}',
    update: '/employees/{id}/update',
    invite: '/employees/invite'
  },

  errors: {
    forbidden: '/errors/403',
    notFound: '/errors/404'
  },

  manageHolidays: {
    manage: '/manage-holidays',
    assign: '/manage-holidays/assign',
    details: '/manage-holidays/{id}/details'
  },

  timeControlRecords: {
    list: '/time-control-records',
    details: '/time-control-records/{id}/details',
    create: '/time-control-records/create',
    update: '/time-control-records/{id}/update'
  },

  timesControlProgress: {
    list: '/times-control-progress'
  }
};
