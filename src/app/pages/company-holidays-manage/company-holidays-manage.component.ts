import { Component, inject } from '@angular/core';
import { DateTime } from 'luxon';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CardComponent } from '../../components/cards/card/card.component';
import { DotComponent } from '../../components/colors/dot/dot.component';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../components/pages/page-header/page-header.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { CalendarDay } from '../../components/year-calendar/month-calendar/calendar-day.model';
import { YearCalendarComponent } from '../../components/year-calendar/year-calendar.component';
import { CalendarColors } from '../../core/types/calendar-colors';
import { WeekDays } from '../../core/types/week-days';
import { ApiUrls } from '../../core/urls/api-urls';
import { CommonUtils } from '../../core/utils/common-utils';
import { DatetimeUtils } from '../../core/utils/datetime-utils';
import { CompanyHoliday } from '../../models/entities/company-holiday.model';
import { CompanyHolidaysApiService } from '../../services/api/company-holidays-api.service';
import { WorkingDaysWeekStateService } from '../../services/states/working-days-week-state.service';
import { CompanyHolidayManageCreateComponent } from './company-holiday-manage-create/company-holiday-manage-create.component';

@Component({
  selector: 'aw-company-holidays-manage',
  standalone: true,
  imports: [
    CardComponent,
    PageBaseComponent,
    PageHeaderComponent,
    YearCalendarComponent,
    SpinnerComponent,
    DotComponent
  ],
  templateUrl: './company-holidays-manage.component.html',
  providers: [BsModalService]
})
export class CompanyHolidaysManageComponent {
  private readonly bsModalService = inject(BsModalService);
  private readonly workingDaysWeekStateService = inject(WorkingDaysWeekStateService);
  private readonly companyHolidaysApiService = inject(CompanyHolidaysApiService);

  private bsModalRef?: BsModalRef;
  date: DateTime;

  calendarDayEvents: CalendarDay[] = [];
  calendarColors = CalendarColors;
  loading = true;

  constructor() {
    this.date = DateTime.local();
    this.getNonWorkingDays();
  }

  handleCalendarDayClick(calendarDay: CalendarDay): void {
    // Se ha de comprobar si es creación o edición.
    this.calendarDayModalEdit(calendarDay);
  }

  calendarDayModalEdit(calendarDay: CalendarDay): void {
    const initialState: ModalOptions = {
      initialState: {
        id: calendarDay.companyHolidayId,
        date: calendarDay.date
      }
    };

    this.bsModalRef = this.bsModalService.show(CompanyHolidayManageCreateComponent, initialState);
    this.bsModalRef.content?.hasSubmit.subscribe({
      next: () => {
        this.getNonWorkingDays();
      }
    });
  }

  /** Obtener días no laborables de la empresa de año actual. */
  private getNonWorkingDays(): void {
    this.loading = true;

    const workingDaysWeek = this.workingDaysWeekStateService.get();
    const daysResult: DateTime[] = [];

    if (!workingDaysWeek?.monday) {
      const monday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.monday);
      daysResult.push(...monday);
    }

    if (!workingDaysWeek?.tuesday) {
      const tuesday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.tuesday);
      daysResult.push(...tuesday);
    }

    if (!workingDaysWeek?.wednesday) {
      const wednesday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.wednesday);
      daysResult.push(...wednesday);
    }

    if (!workingDaysWeek?.thursday) {
      const thursday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.thursday);
      daysResult.push(...thursday);
    }

    if (!workingDaysWeek?.friday) {
      const friday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.friday);
      daysResult.push(...friday);
    }

    if (!workingDaysWeek?.saturday) {
      const saturday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.saturday);
      daysResult.push(...saturday);
    }

    if (!workingDaysWeek?.sunday) {
      const sunday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.sunday);
      daysResult.push(...sunday);
    }

    daysResult.forEach((date: DateTime) => {
      const calendarDayEvent = {
        day: date.day,
        date: date,
        inactive: false,
        isToday: false,
        description: 'Día no laborable',
        background: CalendarColors.notWorkingDay,
        color: '#ffffff',
        canAddEvent: false
      } as CalendarDay;

      this.calendarDayEvents.push(calendarDayEvent);
    });

    this.loadCompanyHolidays();
  }

  private loadCompanyHolidays(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrls.companyHolidays.getCompanyHolidaysByYear, {
      year: String(this.date.year)
    });

    this.companyHolidaysApiService.get<CompanyHoliday[]>(url).subscribe({
      next: (result: CompanyHoliday[]) => {
        this.parseCompanyHolidays(result);
      }
    });
  }

  private parseCompanyHolidays(companyHolidays: CompanyHoliday[]): void {
    companyHolidays.forEach((ch) => {
      const date = DateTime.fromJSDate(new Date(ch.date));

      const calendarDayEvent = {
        day: date.day,
        date: date,
        inactive: false,
        isToday: false,
        description: ch.description,
        background: CalendarColors.holiday,
        color: '#ffffff',
        canAddEvent: true
      } as CalendarDay;

      this.calendarDayEvents.push(calendarDayEvent);
    });

    this.loading = false;
  }
}
