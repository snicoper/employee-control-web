export interface EmployeeHolidayResponse {
  id: string;
  year: number;
  totalDays: number;
  consumedDays: number;
  available: number;
  userId: string;
}
