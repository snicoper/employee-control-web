export interface EmployeeSelectedResponse {
  id: string;
  companyId: number;
  firstName: string;
  lastName: string;
  active: boolean;
  phoneNumber?: string;
  email: string;
  entryDate?: Date;
  emailConfirmed: boolean;
}
