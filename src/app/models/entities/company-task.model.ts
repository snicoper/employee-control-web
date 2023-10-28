import { Company } from './company.model';

export interface CompanyTask {
  id: string;
  companyId: string;
  name: string;
  active: boolean;
  created: Date;
  company?: Company;
}
