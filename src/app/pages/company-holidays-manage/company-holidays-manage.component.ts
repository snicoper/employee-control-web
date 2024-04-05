import { WeekDay } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DateTime } from 'luxon';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CardComponent } from '../../components/cards/card/card.component';
import { DotComponent } from '../../components/colors/dot/dot.component';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../components/pages/page-header/page-header.component';
import { YearSelectorComponent } from '../../components/selectors/year-selector/year-selector.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { CalendarDay } from '../../components/year-calendar/month-calendar/calendar-day.model';
import { YearCalendarComponent } from '../../components/year-calendar/year-calendar.component';
import { CalendarColors } from '../../core/types/calendar-colors';
import { ApiUrls } from '../../core/urls/api-urls';
import { CommonUtils } from '../../core/utils/common-utils';
import { DateUtils } from '../../core/utils/date-utils';
import { DatetimeUtils } from '../../core/utils/datetime-utils';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { CompanyHoliday } from '../../models/entities/company-holiday.model';
import { CompanyHolidaysApiService } from '../../services/api/company-holidays-api.service';
import { CompanySettingsStateService } from '../../services/states/company-settings-state.service';
import { WorkingDaysWeekStateService } from '../../services/states/working-days-week-state.service';
import { CompanyHolidayManageCreateComponent } from './company-holiday-manage-create/company-holiday-manage-create.component';
import { CompanyHolidayManageUpdateComponent } from './company-holiday-manage-update/company-holiday-manage-update.component';

@Component({
  selector: 'aw-company-holidays-manage',
  standalone: true,
  imports: [
    CardComponent,
    PageBaseComponent,
    PageHeaderComponent,
    YearCalendarComponent,
    SpinnerComponent,
    DotComponent,
    YearSelectorComponent,
    TooltipDirective
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
  private workingDaysInYear!: number;
  /** Días de la semana laborables. */
  private workingDaysInWeek!: number;

  date!: DateTime;
  calendarDayEvents: CalendarDay[] = [];
  calendarColors = CalendarColors;
  loading!: boolean;
  workingHoursYear = 0;

  constructor() {
    this.date = DateTime.local();
    this.initialize();
  }

  handleCalendarDayClick(calendarDay: CalendarDay): void {
    // Si tiene valor companyHolidayId, es edición.
    if (calendarDay.companyHolidayId) {
      this.calendarDayModalUpdate(calendarDay);
    } else {
      this.calendarDayModalCreate(calendarDay);
    }
  }

  handleChangeYearSelected(date: Date): void {
    this.date = DateTime.fromJSDate(date);
    this.initialize();
  }

  private calendarDayModalCreate(calendarDay: CalendarDay): void {
    const initialState: ModalOptions = {
      initialState: {
        id: calendarDay.companyHolidayId,
        date: calendarDay.date
      }
    };

    this.bsModalRef = this.bsModalService.show(CompanyHolidayManageCreateComponent, initialState);
    this.bsModalRef.content?.hasSubmit.subscribe({
      next: () => {
        this.initialize();
      }
    });
  }

  private calendarDayModalUpdate(calendarDay: CalendarDay): void {
    const initialState: ModalOptions = {
      initialState: {
        companyHolidayId: calendarDay.companyHolidayId,
        date: calendarDay.date,
        description: calendarDay.description
      }
    };

    this.bsModalRef = this.bsModalService.show(CompanyHolidayManageUpdateComponent, initialState);
    this.bsModalRef.content?.hasSubmit.subscribe({
      next: () => {
        this.initialize();
      }
    });
  }

  /** Obtener días no laborables de la empresa de año actual. */
  private parseNonWorkingDays(): void {
    const nonWorkingDaysWeek = this.workingDaysWeekStateService.get();
    const nonWorkingDaysWeekResult: DateTime[] = [];

    if (!nonWorkingDaysWeek?.monday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Monday));
    }

    if (!nonWorkingDaysWeek?.tuesday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Tuesday));
    }

    if (!nonWorkingDaysWeek?.wednesday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Wednesday));
    }

    if (!nonWorkingDaysWeek?.thursday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Thursday));
    }

    if (!nonWorkingDaysWeek?.friday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Friday));
    }

    if (!nonWorkingDaysWeek?.saturday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Saturday));
    }

    if (!nonWorkingDaysWeek?.sunday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Sunday));
    }

    nonWorkingDaysWeekResult.forEach((date: DateTime) => {
      const calendarDayEvent = {
        day: date.day,
        date: date,
        inactive: false,
        isToday: false,
        description: 'Día no laborable',
        background: CalendarColors.NotWorkingDay,
        color: '#ffffff',
        canAddEvent: false
      } as CalendarDay;

      this.calendarDayEvents.push(calendarDayEvent);
    });

    this.loadCompanyHolidays();
  }

  /** Obtener toas las fechas de un año por su week day. */
  private getWorkingDayWeek(weekDay: WeekDay): DateTime[] {
    const weekDays = DatetimeUtils.weekDaysFromYear(this.date, weekDay);
    this.workingDaysInYear -= weekDays.length;
    this.workingDaysInWeek -= 1;

    return weekDays;
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
        background: CalendarColors.Holiday,
        color: '#ffffff',
        canAddEvent: true
      } as CalendarDay;

      this.calendarDayEvents.push(calendarDayEvent);
    });

    this.calculateWorkingHoursYear();
  }

  private calculateWorkingHoursYear(): void {
    const dailyHours =
      (this.companySettingsStateService.companySettings()?.weeklyWorkingHours as number) / this.workingDaysInWeek;

    this.workingHoursYear = Math.abs(Math.round(dailyHours * this.workingDaysInYear));
    this.loading = false;
  }

  /** Inicializa valores predeterminados e inicia el proceso de calculo. */
  private initialize(): void {
    this.loading = true;
    this.workingHoursYear = 0;
    this.workingDaysInWeek = 7;
    this.workingDaysInYear = DateUtils.daysInYear(this.date.year);
    this.calendarDayEvents = [];

    this.parseNonWorkingDays();
  }
}
