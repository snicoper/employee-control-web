import { ProgressStackedCollection } from '@aw/components/progress/progress-stacked/progress-stacked-colection';
import { HtmlItemSelector } from '@aw/core/models/_index';
import { ucFirst } from '@aw/core/utils/common-utils';
import { DatetimeUtils } from '@aw/core/utils/datetime-utils';
import { ClosedBy } from '@aw/models/entities/types/_index';
import { DateTime, Interval } from 'luxon';
import { TimeControlGroupResponse, TimeResponse } from './times-control-response.model';

/**
 * Obtener un array de HtmlItemSelector.
 *
 * @returns El rango de valores es desde año actual - 10 a año actual.
 */
export const setYearsSelector = (): HtmlItemSelector[] => {
  const yearsSelector: HtmlItemSelector[] = [];
  const currentYear = DateTime.local().year;

  const range = (start: number, end: number): number[] =>
    Array.from(Array(end - start + 1).keys()).map((x) => x + start);

  const rangeYears = range(currentYear - 10, currentYear);

  rangeYears.forEach((year: number) => {
    const item = { id: year, value: year, active: false } as HtmlItemSelector;

    if (currentYear === year) {
      item.active = true;
    }

    yearsSelector.push(item);
  });

  return yearsSelector;
};

/**
 * Obtener un array de HtmlItemSelector.
 *
 * @returns Rango de enero a diciembre localizados.
 */
export const setMonthsSelector = (): HtmlItemSelector[] => {
  const monthsSelector: HtmlItemSelector[] = [];
  const currentMonth = DateTime.local().month;
  const firstMonth = DateTime.local().startOf('year');
  const lastMonth = DateTime.local().endOf('year');

  const intervalDatetime = Interval.fromDateTimes(firstMonth, lastMonth)
    .splitBy({ month: 1 })
    .map((date: Interval) => date.start);

  intervalDatetime.forEach((datetime: DateTime | null) => {
    const monthFormat = ucFirst(datetime?.toFormat('LLLL') ?? '');
    const item = { id: datetime?.month, value: monthFormat } as HtmlItemSelector;

    if (datetime?.month === currentMonth) {
      item.active = true;
    }

    monthsSelector.push(item);
  });

  return monthsSelector;
};

/** Componer rango de tiempos para su representación. */
export const composeTimesControl = (timesControlGroup: TimeControlGroupResponse[]): ProgressStackedCollection[] => {
  const progressStackedCollection: ProgressStackedCollection[] = [];

  timesControlGroup.forEach((timeControlGroup: TimeControlGroupResponse) => {
    const progressStacked = new ProgressStackedCollection();

    let totalMinutesInGroup = 0;
    let currentPercent = 0;
    let lastTimeCalculate: DateTime;

    // Obtener el primer tiempo y establecerlo en lastTimeCalculate.
    if (timeControlGroup.times.length) {
      lastTimeCalculate = DateTime.fromJSDate(new Date(timeControlGroup.times[0].start)).startOf('day');
    }

    timeControlGroup.times.forEach((time: TimeResponse) => {
      totalMinutesInGroup += time.minutes;

      // Calcular posición del día.
      const currentDateTimeStart = DateTime.fromJSDate(new Date(time.start));
      const currentDateTimeEnd = DateTime.fromJSDate(new Date(time.finish));
      const minutesDiff = currentDateTimeStart.diff(lastTimeCalculate, ['minutes']);
      const percentDiff = calculatePercent(minutesDiff.minutes);

      // Insertar tiempo de inactividad.
      progressStacked.addItem(currentPercent, 0, 100, percentDiff, '', '', 'bg-transparent');
      currentPercent += percentDiff;

      // Insertar tiempo de actividad.
      const background = getCssClassByTimeState(time);
      const timeDuration = DatetimeUtils.formatMinutesToTime(time.minutes);
      let tooltip = `${currentDateTimeStart.toLocaleString(DateTime.TIME_SIMPLE)} - `;
      tooltip += `${currentDateTimeEnd.toLocaleString(DateTime.TIME_SIMPLE)}`;

      progressStacked.addItem(currentPercent, 0, 100, time.dayPercent, timeDuration, tooltip, background);
      currentPercent += time.dayPercent;

      lastTimeCalculate = DateTime.fromJSDate(new Date(time.finish));
    });

    const totalGroupTime = DatetimeUtils.formatMinutesToTime(totalMinutesInGroup);
    progressStacked.title = DateTime.fromJSDate(new Date(timeControlGroup.dayTitle)).toLocaleString(
      DateTime.DATE_MED_WITH_WEEKDAY
    );
    progressStacked.title += ` - ${totalGroupTime}`;

    progressStackedCollection.push(progressStacked);
  });

  return progressStackedCollection;
};

/** Obtener el css dependiendo del estado del tiempo. */
const getCssClassByTimeState = (time: TimeResponse): string => {
  switch (time.closedBy) {
    case ClosedBy.unclosed:
      return 'bg-primary';
    case ClosedBy.system:
      return 'bg-danger';
    default:
      return 'bg-success';
  }
};

/** Calcula el porcentaje sobre los minutos totales de un día. */
const calculatePercent = (minutes: number): number => {
  const minutesInDay = 60 * 24;
  const percent = Math.floor((minutes / minutesInDay) * 100);

  return percent;
};
