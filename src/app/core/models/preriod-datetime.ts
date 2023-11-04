import { DateTime } from 'luxon';

export class PeriodDatetime {
  start: DateTime;
  end: DateTime;

  constructor(start: DateTime, end: DateTime) {
    this.start = start;
    this.end = end;
  }

  /** Obtener la duración del periodo en minutos. */
  duration(): number {
    const result = this.start.diff(this.end, ['minutes']).minutes;

    return Math.abs(Math.round(result));
  }
}
