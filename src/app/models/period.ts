import { DateTime } from 'luxon';
import { PeriodDateTime } from './period-datetime';

export class Period {
  start: Date;
  end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  toDateTime(): PeriodDateTime {
    return new PeriodDateTime(DateTime.fromJSDate(this.start), DateTime.fromJSDate(this.end));
  }
}
