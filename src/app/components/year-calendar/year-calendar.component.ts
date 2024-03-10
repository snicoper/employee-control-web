import { Component, Input, OnInit } from '@angular/core';
import { CalendarDay } from './month-calendar/calendar-day.model';

@Component({
  selector: 'aw-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrl: './year-calendar.component.scss'
})
export class YearCalendarComponent implements OnInit {
  @Input({ required: true }) year = new Date().getFullYear();
  @Input() calendarDays: CalendarDay[] = [];

  monthsInYear: Date[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 12; i++) {
      const date = new Date(this.year, i);
      this.monthsInYear.push(date);
    }
  }
}
