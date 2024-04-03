import { DateTime } from 'luxon';

export interface CalendarDay {
  day: number;
  date?: DateTime;
  inactive: boolean;
  isToday: boolean;
  description?: string;
  background?: string;
  color?: string;
  editable: boolean;
  removable: boolean;
  canAddEvent: boolean;
}
