import { CompanyTask } from './company-task.model';
import { User } from './user.model';

export interface Company {
  id: string;
  name: string;
  companyTasks: CompanyTask[];
  users: User[];
}
