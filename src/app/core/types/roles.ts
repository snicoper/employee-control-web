/** Roles del sitio. */
export enum Roles {
  Admin = 'Admin',
  Staff = 'Staff',
  HumanResources = 'HumanResources',
  Employee = 'Employee',
  Anonymous = 'Anonymous'
}

/** Obtener un Role a texto mas legible. */
export const roleToHumanReadable = (role: string | Roles): string => {
  switch (role) {
    case Roles.Admin:
      return 'Administrador';
    case Roles.Staff:
      return 'Staff';
    case Roles.HumanResources:
      return 'RRHH';
    case Roles.Employee:
      return 'Empleado';
    case Roles.Anonymous:
      return 'Anónimo';
    default:
      throw Error('Role no implementado');
  }
};
