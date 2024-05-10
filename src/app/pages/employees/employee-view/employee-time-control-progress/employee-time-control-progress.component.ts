import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { ProgressStackedCollection } from '../../../../components/progress/progress-stacked/progress-stacked-collection';
import { ProgressStackedItem } from '../../../../components/progress/progress-stacked/progress-stacked-item.model';
import { TimeControlProgressComponent } from '../../../../components/progress/time-control-progress/time-control-progress.component';
import { MonthSelectorComponent } from '../../../../components/selectors/month-selector/month-selector.component';
import { TimeControlProgressStacked } from '../../../../core/features/times-control/time-control-group';
import { TimeControlGroupResponse } from '../../../../core/features/times-control/times-control-response.model';
import { ApiUrl } from '../../../../core/urls/api-urls';
import { SiteUrl } from '../../../../core/urls/site-urls';
import { CommonUtils } from '../../../../core/utils/common-utils';
import { DateUtils } from '../../../../core/utils/date-utils';
import { DateTimeUtils } from '../../../../core/utils/datetime-utils';
import { ResultValue } from '../../../../models/result-response.model';
import { HttpClientApiService } from '../../../../services/api/http-client-api.service';
import { EmployeeSelectedService } from '../employee-selected.service';

@Component({
  selector: 'aw-employee-time-control-progress',
  templateUrl: './employee-time-control-progress.component.html',
  standalone: true,
  imports: [MonthSelectorComponent, TimeControlProgressComponent]
})
export class EmployeeTimeControlProgressComponent {
  private readonly httpClientApiService = inject(HttpClientApiService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly router = inject(Router);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());

  progressStackedCollection: Array<ProgressStackedCollection> = [];
  dateSelected = DateTime.local();
  loadingTimeControls = false;
  timeTotalInMonth = '';

  constructor() {
    this.loadTimesControlRange();
  }

  handleDateSelected(date: DateTime): void {
    this.dateSelected = date;
    this.loadTimesControlRange();
  }

  handleClickProgress(progressStackedItem: ProgressStackedItem): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.timeControlRecords.details, { id: progressStackedItem.id });
    this.router.navigateByUrl(url);
  }

  /** Obtener lista de tiempos en el mes/año seleccionado. */
  private loadTimesControlRange(): void {
    this.loadingTimeControls = true;
    this.progressStackedCollection = [];

    const startDate = this.dateSelected.startOf('month');
    const endDate = this.dateSelected.endOf('month');

    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.getTimeControlRangeByEmployeeId, {
      employeeId: this.employeeSelected()?.id.toString() as string,
      from: DateTimeUtils.toISOString(startDate),
      to: DateTimeUtils.toISOString(endDate)
    });

    this.httpClientApiService
      .get<ResultValue<TimeControlGroupResponse[]>>(url)
      .pipe(finalize(() => (this.loadingTimeControls = false)))
      .subscribe({
        next: (result: ResultValue<TimeControlGroupResponse[]>) => {
          const timeControlProgressStacked = new TimeControlProgressStacked(result.value, this.dateSelected);
          this.progressStackedCollection = timeControlProgressStacked.compose();

          const timeTotal = result.value
            .filter((group) => group.totalMinutes > 0)
            .reduce((current, next) => current + next.totalMinutes, 0);

          this.timeTotalInMonth = DateUtils.formatMinutesToTime(timeTotal);
        }
      });
  }
}
