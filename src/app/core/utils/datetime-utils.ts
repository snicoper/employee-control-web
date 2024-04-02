import { DateTime, Interval } from 'luxon';

export abstract class DatetimeUtils {
  /**
   * Obtener un array con un intervalo de días desde start a end con DateTime.
   *
   * @param start Fecha de inicio.
   * @param end Fecha final.
   * @returns Un array de DateTime con el intervalo de días.
   */
  static dayDateTimeInterval(start: DateTime, end: DateTime): (DateTime | null)[] {
    return Interval.fromDateTimes(start.startOf('day'), end.endOf('day'))
      .splitBy({ day: 1 })
      .map((date: Interval) => date.start);
  }
}
