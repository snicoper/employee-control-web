export interface Employee {
  id: string;
  companyId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  active: boolean;
  emailConfirmed: boolean;
  userRoles: string[];
}
