import { Component, inject } from '@angular/core';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { CalendarDay } from '../../components/year-calendar/month-calendar/calendar-day.model';
import { YearCalendarComponent } from '../../components/year-calendar/year-calendar.component';
import { WeekDays } from '../../core/types/week-days';
import { DatetimeUtils } from '../../core/utils/datetime-utils';
import { WorkingDaysWeekStateService } from '../../services/states/working-days-week-state.service';

@Component({
  selector: 'aw-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [PageBaseComponent, YearCalendarComponent]
})
export class DashboardComponent {
  private readonly workingDaysWeekStateService = inject(WorkingDaysWeekStateService);

  private nonWorkingDays: Date[] = [];

  year = new Date().getFullYear();
  calendarDayEvents: CalendarDay[] = [];

  constructor() {
    this.getNonWorkingDays();
  }

  handleCalendarDayClick(calendarDay: CalendarDay): void {
    console.log(calendarDay);
  }

  /** Obtener días no laborables de la empresa de año actual. */
  private getNonWorkingDays(): void {
    const workingDaysWeek = this.workingDaysWeekStateService.get();
    const daysResult: Date[] = [];

    if (!workingDaysWeek?.monday) {
      const monday = DatetimeUtils.getWeekDaysFromYear(this.year, WeekDays.monday);
      daysResult.push(...monday);
    }

    if (!workingDaysWeek?.tuesday) {
      const tuesday = DatetimeUtils.getWeekDaysFromYear(this.year, WeekDays.tuesday);
      daysResult.push(...tuesday);
    }

    if (!workingDaysWeek?.wednesday) {
      const wednesday = DatetimeUtils.getWeekDaysFromYear(this.year, WeekDays.wednesday);
      daysResult.push(...wednesday);
    }

    if (!workingDaysWeek?.thursday) {
      const thursday = DatetimeUtils.getWeekDaysFromYear(this.year, WeekDays.thursday);
      daysResult.push(...thursday);
    }

    if (!workingDaysWeek?.friday) {
      const friday = DatetimeUtils.getWeekDaysFromYear(this.year, WeekDays.friday);
      daysResult.push(...friday);
    }

    if (!workingDaysWeek?.saturday) {
      const saturday = DatetimeUtils.getWeekDaysFromYear(this.year, WeekDays.saturday);
      daysResult.push(...saturday);
    }

    if (!workingDaysWeek?.sunday) {
      const sunday = DatetimeUtils.getWeekDaysFromYear(this.year, WeekDays.sunday);
      daysResult.push(...sunday);
    }

    daysResult.forEach((date: Date) => {
      const calendarDayEvent = {
        day: date.getDate(),
        date: date,
        inactive: false,
        isToday: false,
        background: '#af7d7d'
      } as CalendarDay;

      this.calendarDayEvents.push(calendarDayEvent);
    });

    console.log(daysResult);
  }

  private toCalendarDayEvents(): void {}
}
