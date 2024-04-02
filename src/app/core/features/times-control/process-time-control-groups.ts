import { DateTime } from 'luxon';
import { logError } from '../../errors/log-messages';
import { PeriodDatetime } from '../../models/preriod-datetime';
import { calculatePercent } from '../../utils/common-utils';
import { DatetimeUtils } from '../../utils/datetime-utils';
import { TimeControlGroupResponse, TimeResponse } from './times-control-response.model';

/**
 * Procesa una respuesta y re-calcula los times según el
 * timezone del usuario.
 */
export class ProcessTimeControlGroups {
  private readonly timeControlGroups: TimeControlGroupResponse[];
  private readonly timeControlGroupsResult: TimeControlGroupResponse[] = [];
  private readonly date: DateTime;
  private readonly minutesInDay: number;

  constructor(timeControlGroups: TimeControlGroupResponse[], date: Date) {
    this.date = DateTime.fromJSDate(date);
    this.minutesInDay = 60 * 24;
    this.timeControlGroups = timeControlGroups;
  }

  /**
   * Comprueba todos los TimeResponse[] en base al timezone del usuario.
   * Genera una nueva lista de TimeControlGroupResponse[].
   *
   * @returns TimeControlGroupResponse[].
   */
  process(): TimeControlGroupResponse[] {
    this.createTimeControlGroupForCurrentMonth();
    this.timeControlGroups.forEach((timeControlGroup) => this.processTimeControlGroup(timeControlGroup));

    return this.timeControlGroupsResult;
  }

  /** Procesa cada TimeControlGroupResponse. */
  private processTimeControlGroup(timeControlGroup: TimeControlGroupResponse): void {
    this.processTimesInTimeControl(timeControlGroup.times, timeControlGroup.day);
  }

  /** Procesa una lista de TimeResponse[]. */
  private processTimesInTimeControl(times: TimeResponse[], day: number): void {
    times.forEach((time) => {
      const start = DateTime.fromJSDate(new Date(time.start));
      const end = DateTime.fromJSDate(new Date(time.finish));
      const period = new PeriodDatetime(start, end);

      // Tiempo dentro del día actual.
      // |----------------| Current day.
      //     |--------| Time.
      if (period.start.day === day && period.end.day === day && period.start.day === day && period.end.day === day) {
        this.processTimeInRange(time, period, day);

        return;
      }

      // Comprobar los tiempos anteriores a las 00:00:00.
      //      |----------------| Current day.
      // |--------| Time.
      if (period.start.day < day && period.end.day === day) {
        this.processUnderTime(time, period, day);

        return;
      }

      // Tiempos que al menos el final supera al día actual.
      // |----------------| Current day.
      //             |--------| Time.
      if (period.end.day > day && period.start.day === day) {
        this.processOverTime(time, period, day);
      }
    });
  }

  /**
   * Caso en que el tiempo de inicio y final están dentro del día actual.
   * |----------------| Current day.
   *    |--------| Time.
   */
  private processTimeInRange(time: TimeResponse, period: PeriodDatetime, day: number): void {
    const currentItemControl = this.currentTimeControlGroup(day);

    if (!currentItemControl) {
      return;
    }

    // |-------------------| Current day.
    //    |----------| Time.
    const newTime = this.createTimeResponse(time, period.start.toJSDate(), period.end.toJSDate(), period.duration());

    currentItemControl.totalMinutes += period.duration();
    currentItemControl.times.push(newTime);
  }

  /**
   * Tiempos que terminan y/o empiezan pasadas las 23:59:59.
   * |---------------| Current day.
   *                    |--------| Time.
   *            |--------| Time.
   */
  private processOverTime(time: TimeResponse, period: PeriodDatetime, day: number): void {
    const nextTimeControl = this.nextTimeControlGroup(day);
    const currentItemControl = this.currentTimeControlGroup(day);

    if (!nextTimeControl || !currentItemControl) {
      return;
    }

    // Comprobar si el inicio también supera el día actual.
    // |---------------| Current day.
    //                    |--------| Time.
    if (period.start.day > day) {
      const newOverTime1 = this.createTimeResponse(
        time,
        period.start.toJSDate(),
        period.end.toJSDate(),
        period.duration()
      );

      nextTimeControl.totalMinutes += period.duration();
      nextTimeControl.times.push(newOverTime1);

      return;
    }

    // Este caso solo puede haber uno por TimeControlGroupResponse.
    // El inicio comienza el día actual y el final el día siguiente.
    // |---------------------| Current day.
    //                   |--------| Time.
    const diffMidnight = Math.round(period.start.endOf('day').diff(period.start, ['minutes']).minutes);
    const duration = Math.abs(Math.round(period.duration() - diffMidnight));

    // Día siguiente desde las 00:00.00.
    const newOverTime2 = this.createTimeResponse(
      time,
      period.end.startOf('day').toJSDate(),
      period.end.startOf('day').plus({ minutes: duration }).toJSDate(),
      duration
    );

    nextTimeControl.totalMinutes += duration;
    nextTimeControl.times.unshift(newOverTime2);

    // Día actual hasta las 23:59:59.
    const newTime = this.createTimeResponse(
      time,
      period.start.toJSDate(),
      period.start.endOf('day').toJSDate(),
      diffMidnight
    );

    currentItemControl.totalMinutes += diffMidnight;
    currentItemControl.times.push(newTime);
  }

  /**
   * Comprobar si el final también supera el día actual.
   *                |---------------------| Current day.
   * |---------| Time.
   *          |---------| Time.
   */
  private processUnderTime(time: TimeResponse, period: PeriodDatetime, day: number): void {
    const prevTimeControl = this.prevTimeControlGroup(day);
    const currentItemControl = this.currentTimeControlGroup(day);

    if (!prevTimeControl || !currentItemControl) {
      return;
    }

    // Comprobar si el final también supera el día actual.
    //               |---------------------| Current day.
    // |---------| Time.
    if (period.end.day < day) {
      const newUnderTime1 = this.createTimeResponse(
        time,
        period.start.toJSDate(),
        period.end.toJSDate(),
        period.duration()
      );

      prevTimeControl.totalMinutes += period.duration();
      prevTimeControl.times.push(newUnderTime1);

      return;
    }

    // Este caso solo puede haber uno por TimeControlGroupResponse.
    // El inicio comienza el día anterior y el final termina el día actual.
    const diffMidnight = Math.round(period.end.diff(period.end.startOf('day'), ['minutes']).minutes);
    const duration = Math.round(period.duration() - diffMidnight);

    // Día anterior hasta las 00:00.00.
    //            |-----------------------| Current day.
    //        |--------| Time.
    const newUnderTime = this.createTimeResponse(
      time,
      period.start.toJSDate(),
      period.end.endOf('day').toJSDate(),
      duration
    );

    prevTimeControl.totalMinutes += duration;
    prevTimeControl.times.push(newUnderTime);

    // Día actual desde las 00:00:00.
    //      |-----------------------| Current day.
    // |--------| Time.
    const newTime = this.createTimeResponse(
      time,
      period.start.startOf('day').toJSDate(),
      period.start.plus(duration).toJSDate(),
      diffMidnight
    );

    currentItemControl.totalMinutes += diffMidnight;
    currentItemControl.times.push(newTime);
  }

  /** Crea un TimeControlGroupResponse por cada día del mes actual.  */
  private createTimeControlGroupForCurrentMonth(): void {
    const dateStart = this.date.startOf('month').startOf('day');
    const dateEnd = this.date.endOf('month').endOf('day');

    DatetimeUtils.dayDateTimeInterval(dateStart, dateEnd).forEach((currentDay) => {
      const timeControlGroupResponse = {
        day: currentDay?.day,
        dayTitle: currentDay?.toFormat('yyyy-LL-dd'),
        totalMinutes: 0,
        times: []
      } as TimeControlGroupResponse;

      this.timeControlGroupsResult.push(timeControlGroupResponse);
    });
  }

  /** Obtener el siguiente TimeControlGroupResponse (por day) al día pasado. */
  private nextTimeControlGroup(index: number): TimeControlGroupResponse | null {
    const currentTimeControlGroup = this.currentTimeControlGroup(index);

    if (!currentTimeControlGroup) {
      logError('Error al obtener el currentTimeControlGroup.');

      return null;
    }

    const nextDay = DateTime.fromISO(currentTimeControlGroup.dayTitle)
      .set({ day: index })
      .plus({ day: 1 })
      .toFormat('yyyy-LL-dd');

    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.dayTitle === nextDay);

    return item ?? null;
  }

  /** Obtener el anterior TimeControlGroupResponse (por day) al día pasado. */
  private prevTimeControlGroup(index: number): TimeControlGroupResponse | null {
    const currentTimeControlGroup = this.currentTimeControlGroup(index);

    if (!currentTimeControlGroup) {
      logError('Error al obtener el currentTimeControlGroup.');

      return null;
    }

    const nextDay = DateTime.fromISO(currentTimeControlGroup.dayTitle)
      .set({ day: index })
      .minus({ day: 1 })
      .toFormat('yyyy-LL-dd');

    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.dayTitle === nextDay);

    return item ?? null;
  }

  /** Obtener el item actual TimeControlGroupResponse. */
  private currentTimeControlGroup(index: number): TimeControlGroupResponse | null {
    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.day === index);

    return item ?? null;
  }

  /** Crea un nuevo TimeControl con los tiempos calculados. */
  private createTimeResponse(time: TimeResponse, start: Date, finish: Date, minutes: number): TimeResponse {
    const timeResponse = {
      id: time.id,
      start: start,
      finish: finish,
      incidence: time.incidence,
      timeState: time.timeState,
      closedBy: time.closedBy,
      minutes: minutes,
      dayPercent: calculatePercent(this.minutesInDay, minutes)
    } as TimeResponse;

    return timeResponse;
  }
}
