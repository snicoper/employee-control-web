import { Company } from './company.model';

export interface User {
  id: string;
  companyId: number;
  firstName: string;
  lastName: string;
  active: boolean;
  phoneNumber?: string;
  email: string;
  entryDate?: Date;
  emailConfirmed: boolean;
  // FIXME: Este campo no debería estar en este modelo.
  userRoles: string[];
  company?: Company;
}
