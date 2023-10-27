import { Company } from './company.model';

export interface CompanyTask {
  id: number;
  companyId: number;
  name: string;
  company?: Company;
}
