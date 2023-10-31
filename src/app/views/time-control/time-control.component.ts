import { Component, inject } from '@angular/core';
import { ProgressStackedCollection } from '@aw/components/progress/progress-stacked/progress-stacked-colection';
import { logError } from '@aw/core/errors/log-messages';
import { HtmlItemSelector } from '@aw/core/models/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { ResultResponse } from '@aw/models/result-response.model';
import { JwtService } from '@aw/services/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { TimeControlApiService } from './../../services/api/time-control-api.service';
import { TimeControlStateResponse } from './time-control-state-response.model';
import { setMonthsSelector, setYearsSelector } from './time-control.utils';

@Component({
  selector: 'aw-time-control',
  templateUrl: './time-control.component.html'
})
export class TimeControlComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);

  readonly progressStackedCollection: ProgressStackedCollection[] = [];

  /** Filters. */
  yearsSelector: HtmlItemSelector[] = [];
  yearSelected: HtmlItemSelector | undefined;
  monthsSelector: HtmlItemSelector[] = [];
  monthSelected: HtmlItemSelector | undefined;

  timeControlStarting = false;
  loadingStatus = false;

  constructor() {
    this.eliminar();
    this.isOpenTime();
  }

  handleStart(): void {
    this.loadingStatus = true;
    const data = { employeeId: this.jwtService.getSid() };

    this.timeControlApiService
      .post<typeof data, ResultResponse>(data, ApiUrls.timeControl.startTimeControl)
      .pipe(finalize(() => (this.loadingStatus = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.timeControlStarting = true;
            this.toastrService.success('Tiempo iniciado con éxito.');
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  handleFinished(): void {
    this.loadingStatus = true;
    const data = { employeeId: this.jwtService.getSid() };

    this.timeControlApiService
      .post<typeof data, ResultResponse>(data, ApiUrls.timeControl.finishTimeControl)
      .pipe(finalize(() => (this.loadingStatus = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.timeControlStarting = false;
            this.toastrService.success('Tiempo finalizado con éxito.');
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
  private isOpenTime(): void {
    this.loadingStatus = true;
    const url = ApiUrls.replace(ApiUrls.timeControl.getCurrentStateTimeControl, {
      employeeId: this.jwtService.getSid()
    });

    this.timeControlApiService
      .get<TimeControlStateResponse>(url)
      .pipe(finalize(() => (this.loadingStatus = false)))
      .subscribe({
        next: (result: TimeControlStateResponse) => {
          this.timeControlStarting = result.isOpen;
        }
      });
  }

  private eliminar(): void {
    this.setDropdownsDefaultValues();
    const item = new ProgressStackedCollection()
      .addItem(0, 0, 100, 10, '12/10123', 'Prueba de tooltip', 'bg-success')
      .addItem(10, 0, 100, 10, '12/10123', '', 'bg-transparent')
      .addItem(20, 0, 100, 20, '12/10123', 'Prueba de tooltip', 'bg-success');

    item.addTitle('Lunes día xx/xx/xxxx');

    this.progressStackedCollection.push(item);

    const item2 = new ProgressStackedCollection()
      .addItem(0, 0, 100, 10, '12/10123', 'Prueba de tooltip', 'bg-success')
      .addItem(10, 0, 100, 20, '12/10123', '', 'bg-transparent')
      .addItem(30, 0, 100, 30, '12/10123', 'Prueba de tooltip', 'bg-success');

    item2.addTitle('Martes día xx/xx/xxxx');

    this.progressStackedCollection.push(item2);
  }
}
