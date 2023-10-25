export interface EmployeeSelectedResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  emailConfirmed: boolean;
  userRoles: string[];
}
