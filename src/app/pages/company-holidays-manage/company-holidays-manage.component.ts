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
import { DateUtils } from '../../core/utils/date-utils';
import { DatetimeUtils } from '../../core/utils/datetime-utils';
import { CompanyHoliday } from '../../models/entities/company-holiday.model';
import { CompanyHolidaysApiService } from '../../services/api/company-holidays-api.service';
import { CompanySettingsStateService } from '../../services/states/company-settings-state.service';
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
  private readonly companySettingsStateService = inject(CompanySettingsStateService);

  private bsModalRef?: BsModalRef;

  /** Días de trabajo en el año seleccionado. */
  private workingDaysInYear: number;
  /** Días de la semana no laborables. */
  private workingDaysInWeek = 7;

  date: DateTime;
  calendarDayEvents: CalendarDay[] = [];
  calendarColors = CalendarColors;
  loading = true;
  workingHoursYear = 0;

  constructor() {
    this.date = DateTime.local();
    this.workingDaysInYear = DateUtils.daysInYear(this.date.year);
    this.getNonWorkingDays();
  }

  handleCalendarDayClick(calendarDay: CalendarDay): void {
    // Si tiene valor companyHolidayId, es edición.
    if (calendarDay.companyHolidayId) {
      // Nothing.
    } else {
      this.calendarDayModalCreate(calendarDay);
    }
  }

  calendarDayModalCreate(calendarDay: CalendarDay): void {
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
      const monday = DatetimeUtils.weekDaysFromYear(this.date, WeekDays.monday);
      this.workingDaysInYear -= monday.length;
      this.workingDaysInWeek -= 1;
      daysResult.push(...monday);
    }

    if (!workingDaysWeek?.tuesday) {
      const tuesday = DatetimeUtils.weekDaysFromYear(this.date, WeekDays.tuesday);
      this.workingDaysInYear -= tuesday.length;
      this.workingDaysInWeek -= 1;
      daysResult.push(...tuesday);
    }

    if (!workingDaysWeek?.wednesday) {
      const wednesday = DatetimeUtils.weekDaysFromYear(this.date, WeekDays.wednesday);
      this.workingDaysInYear -= wednesday.length;
      this.workingDaysInWeek -= 1;
      daysResult.push(...wednesday);
    }

    if (!workingDaysWeek?.thursday) {
      const thursday = DatetimeUtils.weekDaysFromYear(this.date, WeekDays.thursday);
      this.workingDaysInYear -= thursday.length;
      this.workingDaysInWeek -= 1;
      daysResult.push(...thursday);
    }

    if (!workingDaysWeek?.friday) {
      const friday = DatetimeUtils.weekDaysFromYear(this.date, WeekDays.friday);
      this.workingDaysInYear -= friday.length;
      this.workingDaysInWeek -= 1;
      daysResult.push(...friday);
    }

    if (!workingDaysWeek?.saturday) {
      const saturday = DatetimeUtils.weekDaysFromYear(this.date, WeekDays.saturday);
      this.workingDaysInYear -= saturday.length;
      this.workingDaysInWeek -= 1;
      daysResult.push(...saturday);
    }

    if (!workingDaysWeek?.sunday) {
      const sunday = DatetimeUtils.weekDaysFromYear(this.date, WeekDays.sunday);
      this.workingDaysInYear -= sunday.length;
      this.workingDaysInWeek -= 1;
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
        this.workingDaysInYear -= result.length;
        this.parseCompanyHolidays(result);
      }
    });
  }

  private parseCompanyHolidays(companyHolidays: CompanyHoliday[]): void {
    companyHolidays.forEach((ch) => {
      const date = DateTime.fromISO(String(ch.date));

      const calendarDayEvent = {
        companyHolidayId: ch.id,
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

    this.calculateWorkingHoursYear();
  }

  private calculateWorkingHoursYear(): void {
    const dayHours =
      (this.companySettingsStateService.companySettings()?.weeklyWorkingHours as number) / this.workingDaysInWeek;

    this.workingHoursYear = dayHours * this.workingDaysInYear;
    this.workingDaysInYear = Math.abs(this.workingDaysInYear);

    // TODO: Falta calcular los días de vacaciones (¿22|23 días * 8 horas?).
    // this.workingHoursYear -= 8 * 22;

    this.loading = false;
  }
}
