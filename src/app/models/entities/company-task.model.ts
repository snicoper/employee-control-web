import { Company } from './company.model';

export interface CompanyTask {
  id: string;
  companyId: string;
  name: string;
  active: boolean;
  company?: Company;
}
