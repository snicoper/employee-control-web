export interface EmployeeHolidayResponse {
  id: string;
  year: number;
  totalDays: number;
  consumed: number;
  remaining: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}
