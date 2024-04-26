import { CompanyCalendar } from './company-calendar.model';

export interface CompanyCalendarHoliday {
  id: string;
  date: Date;
  description: string;
  companyCalendarId: string;
  companyCalendar: CompanyCalendar;
}
