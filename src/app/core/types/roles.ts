/** Roles del sitio. */
export enum Roles {
  administrator = 'Administrator',
  staff = 'Staff',
  enterpriseAdministrator = 'EnterpriseAdministrator',
  humanResources = 'HumanResources',
  employee = 'Employee',
  anonymous = 'anonymous'
}

/** Obtener un Role a texto mas legible. */
export const roleToHumanReadable = (role: string | Roles): string => {
  switch (role) {
    case Roles.administrator:
      return 'Administrador Web';
    case Roles.staff:
      return 'Staff';
    case Roles.enterpriseAdministrator:
      return 'Administrador';
    case Roles.humanResources:
      return 'RRHH';
    case Roles.employee:
      return 'Empleado';
    case Roles.anonymous:
      return 'Anónimo';
    default:
      throw Error('Role no implementado');
  }
};
