import { Component, inject } from '@angular/core';
import { ProgressStackedCollection } from '@aw/components/progress/progress-stacked/progress-stacked-collection';
import { logError } from '@aw/core/errors/log-messages';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { TimeState } from '@aw/models/entities/types/time-state.model';
import { ResultResponse } from '@aw/models/result-response.model';
import { JwtService } from '@aw/services/_index';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { TimeControlApiService } from './../../services/api/time-control-api.service';
import { composeTimeControlGroups } from './compose-time-control-group';
import { TimeControlGroupResponse, TimeStateResponse } from './times-control-response.model';

@Component({
  selector: 'aw-times-control',
  templateUrl: './times-control.component.html'
})
export class TimesControlComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);

  progressStackedCollection: ProgressStackedCollection[] = [];
  dateSelected = new Date();
  timeStates = TimeState;
  timeState = TimeState.close;
  loadingTimeState = false;
  loadingData = false;

  constructor() {
    this.getTimeState();
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
          if (result.succeeded) {
            this.timeState = TimeState.open;
            this.toastrService.success('Tiempo iniciado con éxito.');
            this.loadTimesControlRange();
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
          if (result.succeeded) {
            this.timeState = TimeState.close;
            this.toastrService.success('Tiempo finalizado con éxito.');
            this.loadTimesControlRange();
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  /** Comprobar si tiene algún tiempo abierto. */
  private getTimeState(): void {
    this.loadingTimeState = true;
    const url = ApiUrls.replace(ApiUrls.timeControl.getCurrentStateTimeControl, {
      employeeId: this.jwtService.getSid()
    });

    this.timeControlApiService
      .get<TimeStateResponse>(url)
      .pipe(finalize(() => (this.loadingTimeState = false)))
      .subscribe({
        next: (result: TimeStateResponse) => {
          this.timeState = result.timeState;
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
          composeTimeControlGroups(result).forEach((progressStacked) =>
            this.progressStackedCollection.push(progressStacked)
          );
        }
      });
  }
}
