import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { WeekDays } from '../../../core/types/_index';
import { ApiUrls } from '../../../core/urls/_index';
import { ResultResponse } from '../../../models/_index';
import { WorkingDaysWeek } from '../../../models/entities/working-days-week.model';
import { WorkingDaysWeekApiService } from '../../../services/api/_index';
import { CurrentCompanyEmployeeService } from '../../../services/states/_index';
import { urlReplaceParams } from './../../../core/utils/common-utils';

@Component({
  selector: 'aw-working-days-week',
  templateUrl: './working-days-week.component.html',
  standalone: true,
  imports: [NgClass, SpinnerComponent]
})
export class WorkingDaysWeekComponent {
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);
  private readonly workingDaysWeekApiService = inject(WorkingDaysWeekApiService);
  private readonly toastrService = inject(ToastrService);

  @Output() workingDaysWeekEmitter = new EventEmitter<WorkingDaysWeek>();

  loadingWorkingDaysWeek = false;
  workingDaysWeek: WorkingDaysWeek | undefined;
  weekDays = WeekDays;

  constructor() {
    this.loadWorkDays();
  }

  handleClickDay(weekDay: WeekDays): void {
    if (!this.workingDaysWeek) {
      return;
    }

    switch (weekDay) {
      case WeekDays.monday:
        this.workingDaysWeek.monday = !this.workingDaysWeek?.monday;
        break;
      case WeekDays.tuesday:
        this.workingDaysWeek.tuesday = !this.workingDaysWeek?.tuesday;
        break;
      case WeekDays.wednesday:
        this.workingDaysWeek.wednesday = !this.workingDaysWeek?.wednesday;
        break;
      case WeekDays.thursday:
        this.workingDaysWeek.thursday = !this.workingDaysWeek?.thursday;
        break;
      case WeekDays.friday:
        this.workingDaysWeek.friday = !this.workingDaysWeek?.friday;
        break;
      case WeekDays.saturday:
        this.workingDaysWeek.saturday = !this.workingDaysWeek?.saturday;
        break;
      case WeekDays.sunday:
        this.workingDaysWeek.sunday = !this.workingDaysWeek?.sunday;
        break;
    }

    this.updateWorkDays();
  }

  private loadWorkDays(): void {
    this.loadingWorkingDaysWeek = true;

    const url = urlReplaceParams(ApiUrls.workingDaysWeek.getWorkingDaysWeekByCompanyId, {
      companyId: this.currentCompanyEmployeeService.getValue()?.id as string
    });

    this.workingDaysWeekApiService
      .get<WorkingDaysWeek>(url)
      .pipe(finalize(() => (this.loadingWorkingDaysWeek = false)))
      .subscribe({
        next: (result: WorkingDaysWeek) => {
          this.workingDaysWeek = result;
          this.workingDaysWeekEmitter.emit(this.workingDaysWeek);
        }
      });
  }

  private updateWorkDays(): void {
    if (!this.workingDaysWeek) {
      return;
    }

    this.loadingWorkingDaysWeek = true;
    const url = urlReplaceParams(ApiUrls.workingDaysWeek.updateWorkingDaysWeek, { id: this.workingDaysWeek.id });

    this.workingDaysWeekApiService
      .put<WorkingDaysWeek, ResultResponse>(this.workingDaysWeek, url)
      .pipe(finalize(() => (this.loadingWorkingDaysWeek = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (!result.succeeded) {
            this.toastrService.error('Error al actualizar día laborable.');
          }

          this.workingDaysWeekEmitter.emit(this.workingDaysWeek);
        },
        error: () => {
          this.toastrService.error('Error al actualizar día laborable.');
        }
      });
  }
}
