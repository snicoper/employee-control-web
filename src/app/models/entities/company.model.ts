import { CompanySettings } from './company-settings.model';
import { CompanyTask } from './company-task.model';
import { User } from './user.model';

export interface Company {
  id: string;
  name: string;
  companySettingsId: string;
  companySettings: CompanySettings;
  companyTasks: CompanyTask[];
  users: User[];
}
