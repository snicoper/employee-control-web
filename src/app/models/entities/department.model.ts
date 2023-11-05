import { Company } from './company.model';

export interface Department {
  name: string;
  active: boolean;
  companyId: string;
  company: Company;
}
