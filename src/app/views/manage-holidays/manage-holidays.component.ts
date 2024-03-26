import { Component } from '@angular/core';
import { CardComponent } from '../../components/cards/card/card.component';
import { ViewBaseComponent } from '../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../components/views/view-header/view-header.component';
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
  workDays: WorkDays | undefined;

  constructor() {
    DatetimeUtils.getWeekDaysFromYear(new Date().getFullYear(), WeekDays.friday);
  }

  handleWorkDays(workDays: WorkDays | undefined): void {
    this.workDays = workDays;
  }
}
