import { Company } from './company.model';

export interface Department {
  name: string;
  active: boolean;
  companyId: string;
  background: string;
  color: string;
  company: Company;
}
