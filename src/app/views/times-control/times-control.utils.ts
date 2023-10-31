import { HtmlItemSelector } from '@aw/core/models/_index';
import { ucFirst } from '@aw/core/utils/common-utils';
import { DateTime, Interval } from 'luxon';

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
