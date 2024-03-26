import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { WeekDays } from '../../../core/types/_index';
import { ApiUrls } from '../../../core/urls/_index';
import { ResultResponse } from '../../../models/_index';
import { WorkDays } from '../../../models/entities/_index';
import { WorkDaysApiService } from '../../../services/api/_index';
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
  private readonly workDaysApiService = inject(WorkDaysApiService);
  private readonly toastrService = inject(ToastrService);

  @Output() workDaysEmitter = new EventEmitter<WorkDays>();

  loadingWorkDays = false;
  workDays: WorkDays | undefined;
  weekDays = WeekDays;

  constructor() {
    this.loadWorkDays();
  }

  handleClickDay(weekDay: WeekDays): void {
    if (!this.workDays) {
      return;
    }

    switch (weekDay) {
      case WeekDays.monday:
        this.workDays.monday = !this.workDays?.monday;
        break;
      case WeekDays.tuesday:
        this.workDays.tuesday = !this.workDays?.tuesday;
        break;
      case WeekDays.wednesday:
        this.workDays.wednesday = !this.workDays?.wednesday;
        break;
      case WeekDays.thursday:
        this.workDays.thursday = !this.workDays?.thursday;
        break;
      case WeekDays.friday:
        this.workDays.friday = !this.workDays?.friday;
        break;
      case WeekDays.saturday:
        this.workDays.saturday = !this.workDays?.saturday;
        break;
      case WeekDays.sunday:
        this.workDays.sunday = !this.workDays?.sunday;
        break;
    }

    this.updateWorkDays();
  }

  private loadWorkDays(): void {
    this.loadingWorkDays = true;

    const url = urlReplaceParams(ApiUrls.workingDaysWeek.getWorkingDaysWeekByCompanyId, {
      companyId: this.currentCompanyEmployeeService.getValue()?.id as string
    });

    this.workDaysApiService
      .get<WorkDays>(url)
      .pipe(finalize(() => (this.loadingWorkDays = false)))
      .subscribe({
        next: (result: WorkDays) => {
          this.workDays = result;
          this.workDaysEmitter.emit(this.workDays);
        }
      });
  }

  private updateWorkDays(): void {
    if (!this.workDays) {
      return;
    }

    this.loadingWorkDays = true;
    const url = urlReplaceParams(ApiUrls.workingDaysWeek.updateWorkingDaysWeek, { id: this.workDays.id });

    this.workDaysApiService
      .put<WorkDays, ResultResponse>(this.workDays, url)
      .pipe(finalize(() => (this.loadingWorkDays = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (!result.succeeded) {
            this.toastrService.error('Error al actualizar día laborable.');
          }

          this.workDaysEmitter.emit(this.workDays);
        },
        error: () => {
          this.toastrService.error('Error al actualizar día laborable.');
        }
      });
  }
}
