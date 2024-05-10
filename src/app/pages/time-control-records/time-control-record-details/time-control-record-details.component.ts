import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { DotDangerComponent } from '../../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../../components/colors/dot-success/dot-success.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { logObject } from '../../../core/errors/log-messages';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { ClosedBy } from '../../../models/entities/types/closed-by.model';
import { TimeState } from '../../../models/entities/types/time-state.model';
import { Result, ResultValue } from '../../../models/result-response.model';
import { ClosedByPipe } from '../../../pipes/closed-by.pipe';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import { DeviceTypePipe } from '../../../pipes/device-type.pipe';
import { DurationToTimePipe } from '../../../pipes/duration-to-time.pipe';
import { HttpClientApiService } from '../../../services/api/http-client-api.service';
import { SimpleGeolocationService } from '../../../services/simple-geolocation.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { TimeControlRecordDetailsResponse } from './time-control-record-details-response.model';

@Component({
  selector: 'aw-time-control-record-details',
  templateUrl: './time-control-record-details.component.html',
  styleUrl: './time-control-record-details.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    PageBaseComponent,
    PageHeaderComponent,
    DotDangerComponent,
    DotSuccessComponent,
    BtnBackComponent,
    DateFormatPipe,
    DeviceTypePipe,
    ClosedByPipe,
    DurationToTimePipe
  ]
})
export class TimeControlRecordDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBarService = inject(SnackBarService);
  private readonly httpClientApiService = inject(HttpClientApiService);
  private readonly simpleGeolocationService = inject(SimpleGeolocationService);

  private timeControlId = '';

  readonly breadcrumb = new BreadcrumbCollection();

  timeControl: TimeControlRecordDetailsResponse | null = null;
  loadingTimeControl = false;
  timeState = TimeState;
  closedBy = ClosedBy;
  dateTimeShortFormat = DateTime.DATETIME_SHORT;

  ngOnInit(): void {
    this.timeControlId = this.route.snapshot.paramMap.get('id') as string;
    this.loadTimeControl();
    this.setBreadcrumb();
  }

  getStartOpenStreetMapLink(timeControl: TimeControlRecordDetailsResponse): string | null {
    if (timeControl.latitudeStart && timeControl.longitudeStart) {
      return this.simpleGeolocationService.getOpenStreetMapLink(timeControl.latitudeStart, timeControl.longitudeStart);
    }

    return null;
  }

  getFinishOpenStreetMapLink(timeControl: TimeControlRecordDetailsResponse): string | null {
    if (timeControl.latitudeFinish && timeControl.longitudeFinish) {
      return this.simpleGeolocationService.getOpenStreetMapLink(
        timeControl.latitudeFinish,
        timeControl.longitudeFinish
      );
    }

    return null;
  }

  handleNavigateToEmployee(employeeId: string): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.employees.details, { id: employeeId });
    this.router.navigateByUrl(url);
  }

  handleTimeControlUpdate(timeControl: TimeControlRecordDetailsResponse): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.timeControlRecords.update, { id: timeControl.id });
    this.router.navigateByUrl(url);
  }

  handleTimeControlDelete(timeControl: TimeControlRecordDetailsResponse): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.deleteTimeControl, { id: timeControl.id });

    this.httpClientApiService.delete<Result>(url).subscribe({
      next: (result: Result) => {
        if (result.succeeded) {
          this.snackBarService.success('Tiempo eliminado con éxito.');
          this.router.navigateByUrl(SiteUrl.timeControlRecords.list);
        } else {
          this.snackBarService.error('Ha ocurrido un error al eliminar el tiempo.');
          logObject(result.errors);
        }
      }
    });
  }

  handleTimeControlClose(timeControl: TimeControlRecordDetailsResponse): void {
    this.loadingTimeControl = true;
    const data = { timeControlId: timeControl.id };

    this.httpClientApiService
      .put<typeof data, Result>(data, ApiUrl.timeControl.finishTimeControlByStaff)
      .pipe(finalize(() => (this.loadingTimeControl = false)))
      .subscribe({
        next: (result: Result) => {
          if (result.succeeded) {
            this.snackBarService.success('Tiempo finalizado con éxito.');
            this.loadTimeControl();
          } else {
            this.snackBarService.error('Ha ocurrido un error al iniciar el tiempo.');
            logObject(result.errors);
          }
        }
      });
  }

  handleCloseIncidence(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.closeIncidence, { id: this.timeControlId });
    const data = { id: this.timeControlId };

    this.httpClientApiService.put<typeof data, Result>(data, url).subscribe({
      next: (result: Result) => {
        if (result.succeeded) {
          this.snackBarService.success('Incidencia cerrada con éxito.');
          this.loadTimeControl();
        }
      }
    });
  }

  private setBreadcrumb(): void {
    const urlDetails = CommonUtils.urlReplaceParams(SiteUrl.timeControlRecords.details, { id: this.timeControlId });

    this.breadcrumb
      .add('Registro de tiempos', SiteUrl.timeControlRecords.list, '')
      .add('Detalles de tiempo', urlDetails, '', false);
  }

  private loadTimeControl(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.getTimeControlWithEmployeeById, {
      id: this.timeControlId
    });
    this.loadingTimeControl = true;

    this.httpClientApiService
      .get<ResultValue<TimeControlRecordDetailsResponse>>(url)
      .pipe(finalize(() => (this.loadingTimeControl = false)))
      .subscribe({
        next: (result: ResultValue<TimeControlRecordDetailsResponse>) => {
          this.timeControl = result.value;
        }
      });
  }
}
