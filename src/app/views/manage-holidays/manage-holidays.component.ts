import { Component } from '@angular/core';
import { CardComponent } from '../../components/cards/card/card.component';
import { ViewBaseComponent } from '../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../components/views/view-header/view-header.component';
import { CalendarDay } from '../../components/year-calendar/month-calendar/calendar-day.model';
import { YearCalendarComponent } from '../../components/year-calendar/year-calendar.component';
import { WeekDays } from '../../core/types/_index';
import { DatetimeUtils } from '../../core/utils/datetime-utils';
import { WorkDays } from '../../models/entities/work-days.model';
import { WorkingDaysWeekComponent } from './working-days-week/working-days-week.component';

@Component({
  selector: 'aw-manage-holidays',
  templateUrl: './manage-holidays.component.html',
  standalone: true,
  imports: [YearCalendarComponent, ViewBaseComponent, ViewHeaderComponent, CardComponent, WorkingDaysWeekComponent]
})
export class ManageHolidaysComponent {
  private workDays: WorkDays | undefined;

  year = new Date().getFullYear();
  holidays: CalendarDay[] = [];

  constructor() {
    DatetimeUtils.getWeekDaysFromYear(new Date().getFullYear(), WeekDays.friday);
  }

  handleWorkDays(workDays: WorkDays | undefined): void {
    this.workDays = workDays;
    const holidaysWeek = this.getHolidaysWeek();

    if (holidaysWeek.length === 0) {
      return;
    }

    const daysOfYear: Date[] = [];

    holidaysWeek.forEach((holidayWeek) => {
      daysOfYear.push(...DatetimeUtils.getWeekDaysFromYear(this.year, holidayWeek));
    });

    daysOfYear.forEach((dayOfWeek) => {
      const calendarDay: CalendarDay = {
        day: dayOfWeek.getDay(),
        date: dayOfWeek,
        background: '#ff0000',
        color: '#000000',
        isToday: false,
        description: 'No laborable',
        inactive: false
      };

      this.holidays.push(calendarDay);
    });
  }

  /** Obtener días no laborables de la semana. */
  private getHolidaysWeek(): number[] {
    const workDays: number[] = [];

    if (!this.workDays?.monday) {
      workDays.push(Number(WeekDays.monday));
    }

    if (!this.workDays?.tuesday) {
      workDays.push(Number(WeekDays.tuesday));
    }

    if (!this.workDays?.wednesday) {
      workDays.push(Number(WeekDays.wednesday));
    }

    if (!this.workDays?.thursday) {
      workDays.push(Number(WeekDays.thursday));
    }

    if (!this.workDays?.friday) {
      workDays.push(Number(WeekDays.friday));
    }

    if (!this.workDays?.saturday) {
      workDays.push(Number(WeekDays.saturday));
    }

    if (!this.workDays?.sunday) {
      workDays.push(Number(WeekDays.sunday));
    }

    return workDays;
  }
}
