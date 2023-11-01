import { Component, inject } from '@angular/core';
import { ProgressStackedCollection } from '@aw/components/progress/progress-stacked/progress-stacked-colection';
import { logError } from '@aw/core/errors/log-messages';
import { HtmlItemSelector } from '@aw/core/models/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { TimeState } from '@aw/models/entities/types/time-state.model';
import { ResultResponse } from '@aw/models/result-response.model';
import { JwtService } from '@aw/services/_index';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { TimeControlApiService } from './../../services/api/time-control-api.service';
import { TimeControlGroupResponse, TimeStateResponse } from './times-control-response.model';
import { composeTimesControl, setMonthsSelector, setYearsSelector } from './times-control.utils';

@Component({
  selector: 'aw-times-control',
  templateUrl: './times-control.component.html'
})
export class TimesControlComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);

  progressStackedCollection: ProgressStackedCollection[] = [];

  /** Filters. */
  yearsSelector: HtmlItemSelector[] = [];
  yearSelected: HtmlItemSelector | undefined;
  monthsSelector: HtmlItemSelector[] = [];
  monthSelected: HtmlItemSelector | undefined;

  timeStates = TimeState;
  timeState = TimeState.close;
  loadingTimeState = false;
  loadingData = false;

  constructor() {
    this.setDropdownsDefaultValues();
    this.getTimeState();
    this.loadTimesControl();
  }

  handleChangeFilters(): void {
    this.loadTimesControl();
  }

  /** Abrir tiempo de actividad. */
  handleStart(): void {
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
            this.loadTimesControl();
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  /** Cerrar tiempo de actividad. */
  handleFinished(): void {
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
            this.loadTimesControl();
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  /** Establecer valores por defecto en los filtros (dropdowns) de año y mes. */
  private setDropdownsDefaultValues(): void {
    this.yearsSelector = setYearsSelector();
    this.monthsSelector = setMonthsSelector();

    this.yearSelected = this.yearsSelector.find((item) => item.active);
    this.monthSelected = this.monthsSelector.find((item) => item.active);
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
  private loadTimesControl(): void {
    this.loadingData = true;
    this.progressStackedCollection = [];
    const startDate = DateTime.local(Number(this.yearSelected?.id), Number(this.monthSelected?.id), 1);
    const endDate = startDate.endOf('month');
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
          composeTimesControl(result).forEach((progressStacked) =>
            this.progressStackedCollection.push(progressStacked)
          );
        }
      });
  }
}
