import { PeriodDatetime } from '@aw/core/models/_index';
import { calculatePercent } from '@aw/core/utils/common-utils';
import { DatetimeUtils } from '@aw/core/utils/datetime-utils';
import { DateTime } from 'luxon';
import { TimeControlGroupResponse, TimeResponse } from './times-control-response.model';

/**
 * Procesa una respuesta y re-calcula los times según el
 * timezone del usuario..
 */
export class ProcessTimeControlGroups {
  private readonly timeControlGroups: TimeControlGroupResponse[];
  private readonly timeControlGroupsResult: TimeControlGroupResponse[] = [];
  private readonly date: Date;
  private readonly minutesInDay = 60 * 24;

  // TimeControlGroupResponse hora de inicio y final del día.
  private groupStartDay: DateTime;
  private groupEndDay: DateTime;

  constructor(timeControlGroups: TimeControlGroupResponse[], date: Date) {
    this.timeControlGroups = timeControlGroups;
    this.date = date;
    this.groupStartDay = DateTime.local();
    this.groupEndDay = DateTime.local();
  }

  process(): TimeControlGroupResponse[] {
    this.createTimeControlGroupForCurrentMonth();
    this.timeControlGroups.forEach((timeControlGroup) => this.processTimeControlGroup(timeControlGroup));

    return this.timeControlGroupsResult;
  }

  private processTimeControlGroup(timeControlGroup: TimeControlGroupResponse): void {
    this.groupStartDay = DateTime.fromJSDate(new Date(timeControlGroup.dayTitle)).startOf('day');
    this.groupEndDay = this.groupStartDay.endOf('day');

    this.processTimesInTimeControl(timeControlGroup.times, timeControlGroup.day);
  }

  private processTimesInTimeControl(times: TimeResponse[], day: number): void {
    times.forEach((time) => {
      const start = DateTime.fromJSDate(new Date(time.start));
      const end = DateTime.fromJSDate(new Date(time.finish));
      const period = new PeriodDatetime(start, end);

      // Tiempo dentro del día actual.
      // |----------------| Current day.
      //     |--------| Time.
      if (
        period.start.day === this.groupStartDay.day &&
        period.end.day === this.groupStartDay.day &&
        period.start.day === this.groupEndDay.day &&
        period.end.day === this.groupEndDay.day
      ) {
        this.processTimeInRange(time, period, day);

        return;
      }

      // Comprobar los tiempos anteriores a las 00:00:00.
      //      |----------------| Current day.
      // |--------| Time.
      if (period.start.day < this.groupStartDay.day) {
        this.processUnderTime(time, period, day);
      }

      // Tiempos que al menos el final supera al día actual.
      // |----------------| Current day.
      //             |--------| Time.
      if (period.end.day > this.groupEndDay.day) {
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
    const newTime = {
      id: time.id,
      start: period.start.toJSDate(),
      finish: period.end.toJSDate(),
      timeState: time.timeState,
      closedBy: time.closedBy,
      minutes: period.duration(),
      dayPercent: calculatePercent(this.minutesInDay, period.duration())
    } as TimeResponse;

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
    const prevTimeControl = this.prevTimeControlGroup(day);

    if (!nextTimeControl || !currentItemControl) {
      return;
    }

    // Comprobar si el inicio también supera el día actual.
    // |---------------| Current day.
    //                    |--------| Time.
    if (period.start.day > this.groupEndDay.day && prevTimeControl) {
      const newPrevTime = {
        id: time.id,
        start: period.start.toJSDate(),
        finish: period.end.toJSDate(),
        timeState: time.timeState,
        closedBy: time.closedBy,
        minutes: period.duration(),
        dayPercent: calculatePercent(this.minutesInDay, period.duration())
      } as TimeResponse;

      prevTimeControl.totalMinutes += period.duration();
      prevTimeControl.times.push(newPrevTime);

      return;
    }

    // Este caso solo puede haber uno por TimeControlGroupResponse.
    // El inicio comienza el día actual y el final el día siguiente.
    // |---------------------| Current day.
    //                   |--------| Time.
    const diffMidnight = period.start.endOf('day').diff(period.start, ['minutes']).minutes;
    const duration = Math.abs(Math.round(period.duration() - diffMidnight));

    // Día siguiente desde las 00:00.00.
    const newOverTime = {
      id: time.id,
      start: period.end.set({ hour: 0, minute: 0, second: 0 }).toJSDate(),
      finish: period.end.startOf('day').plus({ minutes: duration }).toJSDate(),
      timeState: time.timeState,
      closedBy: time.closedBy,
      minutes: duration,
      dayPercent: calculatePercent(this.minutesInDay, duration)
    } as TimeResponse;

    nextTimeControl.totalMinutes += duration;
    nextTimeControl.times.unshift(newOverTime);

    // Día actual hasta las 23:59:59.
    const newTime = {
      id: time.id,
      start: period.start.toJSDate(),
      finish: period.start.set({ hour: 23, minute: 59, second: 59 }).toJSDate(),
      timeState: time.timeState,
      closedBy: time.closedBy,
      minutes: diffMidnight,
      dayPercent: calculatePercent(this.minutesInDay, diffMidnight)
    } as TimeResponse;

    currentItemControl.totalMinutes -= diffMidnight;
    currentItemControl.times.push(newTime);
  }

  private processUnderTime(time: TimeResponse, period: PeriodDatetime, day: number): void {
    const prevTimeControl = this.prevTimeControlGroup(day);
    const currentItemControl = this.currentTimeControlGroup(day);

    if (!prevTimeControl) {
      return;
    }

    // Comprobar si el final también supera el día actual.
    //               |---------------------| Current day.
    // |---------| Time.
    if (period.end.day > this.groupStartDay.day) {
      // POR HACER.

      return;
    }

    // Este caso solo puede haber uno por TimeControlGroupResponse.
    // El inicio comienza el día anterior y el final termina el día actual.
    //            |-----------------------| Current day.
    //        |--------| Time.
    const diffMidnight = period.start.endOf('day').diff(period.start, ['minutes']).minutes;
    const duration = period.duration() - diffMidnight;

    // Día siguiente desde las 00:00.00.
    const newOverTime = {
      id: time.id,
      start: period.end.set({ hour: 0, minute: 0, second: 0 }).toJSDate(),
      finish: period.end.startOf('day').plus({ minutes: duration }).toJSDate(),
      timeState: time.timeState,
      closedBy: time.closedBy,
      minutes: duration,
      dayPercent: calculatePercent(this.minutesInDay, duration)
    } as TimeResponse;

    prevTimeControl.totalMinutes += duration;
    prevTimeControl.times.unshift(newOverTime);
  }

  /** Crear un TimeControlGroupResponse por cada día del mes actual.  */
  private createTimeControlGroupForCurrentMonth(): void {
    const date = DateTime.fromJSDate(this.date);
    const dateStart = date.startOf('month');
    const dateEnd = date.endOf('month');

    DatetimeUtils.dayDateTimeInterval(dateStart, dateEnd).forEach((currentDay) => {
      const instance = {
        day: currentDay?.day,
        dayTitle: currentDay?.toFormat('yyyy-LL-dd'),
        totalMinutes: 0,
        times: []
      } as TimeControlGroupResponse;

      this.timeControlGroupsResult.push(instance);
    });
  }

  /** Suma el total en minutos en un grupo de TimeResponse[]. */
  private sumMinutesInGroupTimes(times: TimeResponse[]): number {
    const totalMinutes = times.map((item) => item.minutes).reduce((a, b) => a + b, 0);

    return totalMinutes;
  }

  /** Obtener el siguiente item (por day) al día pasado. */
  private nextTimeControlGroup(index: number): TimeControlGroupResponse | null {
    const next = index + 1;
    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.day === next);

    return item ?? null;
  }

  /** Obtener el anterior item (por day) al día pasado. */
  private prevTimeControlGroup(index: number): TimeControlGroupResponse | null {
    const next = index - 1;
    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.day === next);

    return item ?? null;
  }

  /** Obtener el item actual. */
  private currentTimeControlGroup(index: number): TimeControlGroupResponse | null {
    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.day === index);

    return item ?? null;
  }
}
