import { Component, computed, inject } from '@angular/core';
import { ProgressStackedCollection } from '@aw/components/progress/progress-stacked/progress-stacked-collection';
import { TimeControlGroupResponse } from '@aw/core/features/times-control/_index';
import { TimeControlProgressStacked } from '@aw/core/features/times-control/time-control-group';
import { ApiUrls } from '@aw/core/urls/_index';
import { DatetimeUtils } from '@aw/core/utils/_index';
import { CurrentTimeControlStateService } from '@aw/models/_index';
import { TimeState } from '@aw/models/entities/types/_index';
import { TimeControlApiService } from '@aw/services/api/_index';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { EmployeeSelectedService } from '../employee-selected.service';

@Component({
  selector: 'aw-employee-time-control',
  templateUrl: './employee-time-control.component.html'
})
export class EmployeeTimeControlComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly currentTimeControlStateService = inject(CurrentTimeControlStateService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);

  readonly currentTimeControl = computed(() => this.currentTimeControlStateService.currentTimeControl());

  progressStackedCollection: ProgressStackedCollection[] = [];
  loadingTimeState = false;
  dateSelected = new Date();
  timeStates = TimeState;
  loadingTimeControls = false;
  timeTotalInMonth = '';

  constructor() {
    this.loadTimesControlRange();
  }

  handleDateSelected(date: Date): void {
    this.dateSelected = date;
    this.loadTimesControlRange();
  }

  /** Obtener lista de tiempos en el mes/año seleccionado. */
  private loadTimesControlRange(): void {
    this.loadingTimeControls = true;
    this.progressStackedCollection = [];

    const dateSelected = DateTime.fromJSDate(this.dateSelected);
    const startDate = dateSelected.startOf('month');
    const endDate = dateSelected.endOf('month');
    const url = ApiUrls.replace(ApiUrls.timeControl.getTimeControlRangeByEmployeeId, {
      employeeId: this.employeeSelectedService.employeeSelected()?.id.toString() as string,
      from: startDate.toUTC().toString(),
      to: endDate.toUTC().toString()
    });

    this.timeControlApiService
      .get<TimeControlGroupResponse[]>(url)
      .pipe(finalize(() => (this.loadingTimeControls = false)))
      .subscribe({
        next: (result: TimeControlGroupResponse[]) => {
          const timeControlProgressStacked = new TimeControlProgressStacked(result, this.dateSelected);
          this.progressStackedCollection = timeControlProgressStacked.compose();

          const timeTotal = result
            .filter((group) => group.totalMinutes > 0)
            .reduce((current, next) => current + next.totalMinutes, 0);

          this.timeTotalInMonth = DatetimeUtils.formatMinutesToTime(timeTotal);
        }
      });
  }
}
