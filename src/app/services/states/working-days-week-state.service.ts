import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { WeekDay } from '../../core/types/week-day';
import { ApiUrl } from '../../core/urls/api-urls';
import { CommonUtils } from '../../core/utils/common-utils';
import { WorkingDaysWeek } from '../../models/entities/working-days-week.model';
import { Result, ResultValue } from '../../models/result-response.model';
import { HttpClientApiService } from '../api/http-client-api.service';
import { SnackBarService } from '../snackbar.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class WorkingDaysWeekStateService implements StateService<WorkingDaysWeek | null> {
  private readonly httpClientApiService = inject(HttpClientApiService);
  private readonly snackBarService = inject(SnackBarService);

  private readonly workingDaysWeek$ = signal<WorkingDaysWeek | null>(null);
  private readonly loadingWorkingDaysWeek$ = signal(true);

  readonly workingDaysWeek = computed(() => this.workingDaysWeek$());
  readonly loadingWorkingDaysWeek = computed(() => this.loadingWorkingDaysWeek$());

  refresh(): void {
    this.loadWorkingDaysWeek();
  }

  get(): WorkingDaysWeek | null {
    return this.workingDaysWeek$();
  }

  clean(): void {
    this.workingDaysWeek$.set(null);
  }

  updateWeekDay(weekDay: WeekDay): void {
    const workingDaysWeek = this.get() as WorkingDaysWeek;

    switch (weekDay) {
      case WeekDay.Monday:
        workingDaysWeek.monday = !workingDaysWeek.monday;
        break;
      case WeekDay.Tuesday:
        workingDaysWeek.tuesday = !workingDaysWeek.tuesday;
        break;
      case WeekDay.Wednesday:
        workingDaysWeek.wednesday = !workingDaysWeek.wednesday;
        break;
      case WeekDay.Thursday:
        workingDaysWeek.thursday = !workingDaysWeek.thursday;
        break;
      case WeekDay.Friday:
        workingDaysWeek.friday = !workingDaysWeek.friday;
        break;
      case WeekDay.Saturday:
        workingDaysWeek.saturday = !workingDaysWeek.saturday;
        break;
      case WeekDay.Sunday:
        workingDaysWeek.sunday = !workingDaysWeek.sunday;
        break;
    }

    this.updateWorkingDaysWeek(workingDaysWeek);
  }

  private updateWorkingDaysWeek(workingDaysWeek: WorkingDaysWeek): void {
    this.loadingWorkingDaysWeek$.set(true);
    const url = CommonUtils.urlReplaceParams(ApiUrl.workingDaysWeek.updateWorkingDaysWeek, {
      id: this.get()?.id as string
    });

    this.httpClientApiService
      .put<WorkingDaysWeek, Result>(workingDaysWeek, url)
      .pipe(finalize(() => this.loadingWorkingDaysWeek$.set(false)))
      .subscribe({
        next: (result: Result) => {
          if (!result.succeeded) {
            this.snackBarService.error('Error al actualizar día laborable.');
          }

          this.workingDaysWeek$.set(workingDaysWeek);
        },
        error: () => {
          this.snackBarService.error('Error al actualizar día laborable.');
        }
      });
  }

  private loadWorkingDaysWeek(): void {
    this.loadingWorkingDaysWeek$.set(true);

    this.httpClientApiService
      .get<ResultValue<WorkingDaysWeek>>(ApiUrl.workingDaysWeek.getWorkingDaysWeek)
      .pipe(finalize(() => this.loadingWorkingDaysWeek$.set(false)))
      .subscribe({
        next: (result: ResultValue<WorkingDaysWeek>) => {
          this.workingDaysWeek$.set(result.value);
        }
      });
  }
}
