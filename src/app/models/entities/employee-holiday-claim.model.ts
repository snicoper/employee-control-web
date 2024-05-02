import { EmployeeHolidayClaimItem } from './employee-holiday-claim-litem.model';
import { User } from './user.model';

export interface EmployeeHolidayClaim {
  id: string;
  year: number;
  description?: string;
  accepted: boolean;
  userId: string;
  user: User;
  employeeHolidayClaimItems: Array<EmployeeHolidayClaimItem>;
}
