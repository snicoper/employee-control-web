import { Company } from './company.model';
import { User } from './user.model';

export interface TimeControl {
  id: string;
  start: Date;
  finish?: Date;
  user: User;
  userId: string;
  company: Company;
  companyId: string;
}
