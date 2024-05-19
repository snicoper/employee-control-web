export interface EmployeeHolidaysResponse {
  id: string;
  year: number;
  totalDays: number;
  consumedDays: number;
  remaining: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}
