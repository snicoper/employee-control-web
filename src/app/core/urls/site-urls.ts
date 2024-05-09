/** URLs en la APP. */
export const SiteUrl = {
  home: '/',

  accounts: {
    recoveryPassword: '/accounts/recovery-password',
    registerSuccess: '/accounts/restore-password'
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
    calendar: '/company-calendar',
    list: '/company-calendar/list',
    create: '/company-calendar/create',
    update: '/company-calendar/{id}/update',
    details: '/company-calendar/{id}/details'
  },

  companyHolidays: {
    employees: '/company-holidays',
    claims: '/company-holidays/claims',
    details: '/company-holidays/year/{year}/employees/{employeeId}'
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

  departments: {
    list: '/departments',
    details: '/departments/{id}',
    create: '/departments/create',
    update: '/departments/{id}/update'
  },

  employeeCalendar: {
    index: '/employee-calendar'
  },

  employeeSettings: {
    settings: '/employee-settings',
    update: '/employee-settings/update'
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
