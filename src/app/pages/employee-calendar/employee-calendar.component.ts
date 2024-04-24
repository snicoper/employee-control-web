import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../components/pages/page-header/page-header.component';
import { YearSelectorComponent } from '../../components/selectors/year-selector/year-selector.component';
import { CalendarClassColor } from '../../components/year-calendar-view/calendar-class-color';
import { CalendarEvent } from '../../components/year-calendar-view/calendar-event.model';
import { YearCalendarViewComponent } from '../../components/year-calendar-view/year-calendar-view.component';
import { WeekDay } from '../../core/types/week-day';
import { ApiUrl } from '../../core/urls/api-urls';
import { CommonUtils } from '../../core/utils/common-utils';
import { DateTimeUtils } from '../../core/utils/datetime-utils';
import { CompanyHoliday } from '../../models/entities/company-holiday.model';
import { CompanyHolidaysApiService } from '../../services/api/company-holidays-api.service';
import { EmployeeHolidaysApiService } from '../../services/api/employee-holidays-api.service';
import { JwtService } from '../../services/jwt.service';
import { SidenavService } from '../../services/sidenav.service';
import { CompanySettingsStateService } from '../../services/states/company-settings-state.service';
import { WorkingDaysWeekStateService } from '../../services/states/working-days-week-state.service';
import { EmployeeCalendarToolbarComponent } from './employee-calendar-toolbar/employee-calendar-toolbar.component';
import { EmployeeCalendarToolbarService } from './employee-calendar-toolbar/employee-calendar-toolvar.service';
import { EmployeeHolidayResponse } from './employee-holiday-response.model';

@Component({
  selector: 'aw-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrl: './employee-calendar.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    PageBaseComponent,
    PageHeaderComponent,
    YearSelectorComponent,
    YearCalendarViewComponent,
    EmployeeCalendarToolbarComponent
  ],
  providers: [EmployeeCalendarToolbarService]
})
export class EmployeeCalendarComponent {
  private readonly workingDaysWeekStateService = inject(WorkingDaysWeekStateService);
  private readonly companyHolidaysApiService = inject(CompanyHolidaysApiService);
  private readonly companySettingsStateService = inject(CompanySettingsStateService);
  private readonly employeeHolidaysApiService = inject(EmployeeHolidaysApiService);
  private readonly employeeCalendarToolbarService = inject(EmployeeCalendarToolbarService);
  private readonly sidenavService = inject(SidenavService);
  private readonly jwtService = inject(JwtService);

  readonly sidenavToolbarState = computed(() => this.sidenavService.sidenavToolbarState());

  /** Días de trabajo en el año seleccionado. */
  private workingDaysInYear!: number;
  /** Días de la semana laborables. */
  private workingDaysInWeek!: number;

  /** Año seleccionado. */
  yearSelected = DateTime.local();
  calendarEvents: Array<CalendarEvent> = [];
  calendarHolidayEvents: Array<CalendarEvent> = [];
  loading = true;
  workingHoursYear = 0;
  /** Holidays. */
  employeeHoliday!: EmployeeHolidayResponse;
  calendarDaysSelected: Array<DateTime> = [];

  constructor() {
    this.initialize();
  }

  handleYearSelectorChange(year: DateTime): void {
    this.yearSelected = year;
    this.initialize();
  }

  handleSelectChange(calendarEvent: CalendarEvent): void {
    if (!this.sidenavService.sidenavToolbarState()) {
      this.sidenavService.toggleSidenavToolbarState();
    }

    this.addOrRemoveCalendarHolidayEvent(calendarEvent);
    this.employeeCalendarToolbarService.toggleDatesSelected(calendarEvent.date);
  }

  private addOrRemoveCalendarHolidayEvent(calendarEvent: CalendarEvent): void {
    const index = this.calendarHolidayEvents.findIndex((che) => che.date.valueOf() === calendarEvent.date.valueOf());

    if (index >= 0) {
      this.calendarHolidayEvents.splice(index, 1);
    } else {
      const calendarDayEvent = {
        date: calendarEvent.date,
        description: 'Día no laborable',
        cssClass: CalendarClassColor.EmployeeHoliday,
        selectable: true
      } as CalendarEvent;

      this.calendarHolidayEvents.push(calendarDayEvent);
    }

    this.initialize();
  }

  /** Obtener días no laborables de la empresa de año actual. */
  private parseNonWorkingDays(): void {
    const nonWorkingDaysWeek = this.workingDaysWeekStateService.get();
    const nonWorkingDaysWeekResult: Array<DateTime> = [];

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
        date: date,
        description: 'Día no laborable',
        cssClass: CalendarClassColor.NotWorkingDay,
        selectable: false
      } as CalendarEvent;

      this.calendarEvents.push(calendarDayEvent);
    });

    this.loadCompanyHolidays();
  }

  private loadCompanyHolidays(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyHolidays.getCompanyHolidaysByYear, {
      year: String(this.yearSelected.year)
    });

    this.companyHolidaysApiService.get<Array<CompanyHoliday>>(url).subscribe({
      next: (result: Array<CompanyHoliday>) => {
        this.workingDaysInYear -= result.length;
        this.parseCompanyHolidays(result);
      }
    });
  }

  private loadEmployeeHolidays(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.employeeHolidays.getEmployeeHolidaysByYearAndEmployeeId, {
      year: this.yearSelected.year.toString(),
      employeeId: this.jwtService.getSid()
    });

    this.employeeHolidaysApiService
      .get<EmployeeHolidayResponse>(url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: EmployeeHolidayResponse) => {
          this.employeeHoliday = result;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.NotFound) {
            // Nothing.
          }
        }
      });
  }

  private parseCompanyHolidays(companyHolidays: Array<CompanyHoliday>): void {
    companyHolidays.forEach((ch) => {
      const date = DateTime.fromISO(String(ch.date));

      const calendarDayEvent = {
        id: ch.id,
        date: date,
        description: ch.description,
        cssClass: CalendarClassColor.CompanyHoliday,
        selectable: true
      } as CalendarEvent;

      this.calendarEvents.push(calendarDayEvent);
    });

    this.calculateWorkingHoursYear();
  }

  /** Obtener toas las fechas de un año por su week day. */
  private getWorkingDayWeek(weekDay: WeekDay): DateTime[] {
    const weekDays = DateTimeUtils.weekDaysFromYear(this.yearSelected, weekDay);
    this.workingDaysInYear -= weekDays.length;
    this.workingDaysInWeek -= 1;

    return weekDays;
  }

  /** Calcular horas de trabajo, no aplica vacaciones de empleado u otros días libres. */
  private calculateWorkingHoursYear(): void {
    const dailyHours =
      (this.companySettingsStateService.companySettings()?.weeklyWorkingHours as number) / this.workingDaysInWeek;

    this.workingHoursYear = Math.abs(Math.round(dailyHours * this.workingDaysInYear));

    this.loadEmployeeHolidays();
  }

  /** Inicializa cálculos y obtención de datos. */
  private initialize(): void {
    this.loading = true;
    this.calendarEvents = [...this.calendarHolidayEvents];
    this.workingHoursYear = 0;
    this.workingDaysInWeek = 7;
    this.workingDaysInYear = this.yearSelected.daysInYear;

    this.parseNonWorkingDays();
  }
}
