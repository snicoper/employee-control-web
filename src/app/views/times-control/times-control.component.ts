import { Component, computed, inject } from '@angular/core';
import { ProgressStackedCollection } from '@aw/components/progress/progress-stacked/progress-stacked-collection';
import { logError } from '@aw/core/errors/log-messages';
import { TimeControlGroupResponse } from '@aw/core/features/times-control/_index';
import { TimeControlGroup } from '@aw/core/features/times-control/time-control-group';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { CurrentTimeControlStateService } from '@aw/models/_index';
import { TimeState } from '@aw/models/entities/types/time-state.model';
import { ResultResponse } from '@aw/models/result-response.model';
import { JwtService } from '@aw/services/_index';
import { TimeControlApiService } from '@aw/services/api/_index';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'aw-times-control',
  templateUrl: './times-control.component.html'
})
export class TimesControlComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);
  private readonly currentTimeControlStateService = inject(CurrentTimeControlStateService);

  readonly currentTimeControl = computed(() => this.currentTimeControlStateService.currentTimeControl());

  progressStackedCollection: ProgressStackedCollection[] = [];
  loadingTimeState = false;
  dateSelected = new Date();
  timeStates = TimeState;
  loadingData = false;

  constructor() {
    this.loadTimesControlRange();
  }

  handleDateSelected(date: Date): void {
    this.dateSelected = date;
    this.loadTimesControlRange();
  }

  /** Abrir tiempo de actividad. */
  handleTimeStart(): void {
    this.loadingTimeState = true;
    const data = { employeeId: this.jwtService.getSid() };

    this.timeControlApiService
      .post<typeof data, ResultResponse>(data, ApiUrls.timeControl.startTimeControl)
      .pipe(finalize(() => (this.loadingTimeState = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded && this.currentTimeControl !== undefined) {
            this.currentTimeControlStateService.refresh();
            this.loadTimesControlRange();
            this.toastrService.success('Tiempo iniciado con éxito.');
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  /** Cerrar tiempo de actividad. */
  handleTimeFinished(): void {
    this.loadingTimeState = true;
    const data = { employeeId: this.jwtService.getSid() };

    this.timeControlApiService
      .post<typeof data, ResultResponse>(data, ApiUrls.timeControl.finishTimeControl)
      .pipe(finalize(() => (this.loadingTimeState = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded && this.currentTimeControl !== undefined) {
            this.currentTimeControlStateService.refresh();
            this.loadTimesControlRange();
            this.toastrService.success('Tiempo finalizado con éxito.');
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  /** Obtener lista de tiempos en el mes/año seleccionado. */
  private loadTimesControlRange(): void {
    this.loadingData = true;
    this.progressStackedCollection = [];

    const dateSelected = DateTime.fromJSDate(this.dateSelected);
    const startDate = dateSelected.startOf('month');
    const endDate = dateSelected.endOf('month');
    const url = ApiUrls.replace(ApiUrls.timeControl.getTimeControlRangeByEmployeeId, {
      employeeId: this.jwtService.getSid(),
      from: startDate.toUTC().toString(),
      to: endDate.toUTC().toString()
    });

    this.timeControlApiService
      .get<TimeControlGroupResponse[]>(url)
      .pipe(finalize(() => (this.loadingData = false)))
      .subscribe({
        next: (result: TimeControlGroupResponse[]) => {
          const timeControlGroup = new TimeControlGroup(result, this.dateSelected);
          this.progressStackedCollection = timeControlGroup.compose();
        }
      });
  }
}
