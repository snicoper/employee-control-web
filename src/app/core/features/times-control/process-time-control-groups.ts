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

  private processTimesInTimeControl(times: TimeResponse[], day: number): void {}

  /** Tiempos que empiezan antes de las 00:00:00. */
  private processUnderTime(time: TimeResponse, dateEnd: DateTime, minutes: number, day: number): void {}

  /** Tiempos que terminan pasadas las 23:59:59. */
  private processOverTime(time: TimeResponse, dateEnd: DateTime, minutes: number, day: number): void {
    const nextTimeControl = this.nextItem(day);

    if (!nextTimeControl) {
      return;
    }

    const newTime = {
      id: time.id,
      start: dateEnd.startOf('day').toJSDate(),
      finish: dateEnd.startOf('day').plus({ minutes: minutes }).toJSDate(),
      timeState: time.timeState,
      closedBy: time.closedBy,
      minutes: minutes,
      dayPercent: calculatePercent(this.minutesInDay, minutes)
    } as TimeResponse;

    nextTimeControl.totalMinutes += minutes;
    nextTimeControl.times.unshift(newTime);
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
  private nextItem(index: number): TimeControlGroupResponse | null {
    const next = index + 1;
    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.day === next);

    return item ?? null;
  }

  /** Obtener el anterior item (por day) al día pasado. */
  private prevItem(index: number): TimeControlGroupResponse | null {
    const next = index - 1;
    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.day === next);

    return item ?? null;
  }

  /** Obtener el item actual. */
  private current(index: number): TimeControlGroupResponse | null {
    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.day === index);

    return item ?? null;
  }
}
