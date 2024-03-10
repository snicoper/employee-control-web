import { Component } from '@angular/core';
import { CalendarDay } from '@aw/components/year-calendar/month-calendar/calendar-day.model';
import { WorkDays } from './../../../models/entities/work-days.model';

@Component({
  selector: 'aw-work-days',
  templateUrl: './work-days.component.html'
})
export class WorkDaysComponent {
  workdays!: WorkDays;
  calendarDays: CalendarDay[] = [];

  constructor() {
    this.calendarDays.push({
      day: 12,
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 12),
      isToday: false,
      inactive: false,
      background: '#f0f0f0',
      color: 'red'
    });
    this.loadWorkDays();
  }

  private loadWorkDays(): void {}
}
