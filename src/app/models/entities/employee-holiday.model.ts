import { User } from './user.model';

export interface EmployeeHoliday {
  id: string;
  year: number;
  totalDays: number;
  consumedDays: number;
  userId: string;
  user: User;
}
