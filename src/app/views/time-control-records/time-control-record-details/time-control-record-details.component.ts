import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { DotDangerComponent } from '../../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../../components/colors/dot-success/dot-success.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { logError } from '../../../core/errors/_index';
import { ApiUrls, SiteUrls } from '../../../core/urls/_index';
import { urlReplaceParams } from '../../../core/utils/_index';
import { TooltipDirective } from '../../../directives/tooltip.directive';
import { ResultResponse } from '../../../models/_index';
import { ClosedBy, TimeState } from '../../../models/entities/types/_index';
import { ClosedByPipe, DatetimePipe, DeviceTypePipe, DurationToTimePipe } from '../../../pipes/_index';
import { SimpleGeolocationService } from '../../../services/_index';
import { TimeControlApiService } from '../../../services/api/_index';
import { TimeControlRecordDetailsResponse } from './time-control-record-details-response.model';

@Component({
  selector: 'aw-time-control-record-details',
  templateUrl: './time-control-record-details.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    SpinnerComponent,
    DotDangerComponent,
    DotSuccessComponent,
    BtnBackComponent,
    TooltipDirective,
    DatetimePipe,
    DeviceTypePipe,
    ClosedByPipe,
    DurationToTimePipe
  ]
})
export class TimeControlRecordDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly simpleGeolocationService = inject(SimpleGeolocationService);

  private timeControlId = '';

  readonly breadcrumb = new BreadcrumbCollection();

  timeControl: TimeControlRecordDetailsResponse | null = null;
  loadingTimeControl = false;
  timeState = TimeState;
  closedBy = ClosedBy;

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

  handleTimeControlUpdate(timeControl: TimeControlRecordDetailsResponse): void {
    const url = urlReplaceParams(SiteUrls.timeControlRecords.update, { id: timeControl.id });
    this.router.navigateByUrl(url);
  }

  handleTimeControlDelete(timeControl: TimeControlRecordDetailsResponse): void {
    const url = urlReplaceParams(ApiUrls.timeControl.deleteTimeControl, { id: timeControl.id });

    this.timeControlApiService.delete<ResultResponse>(url).subscribe({
      next: (result: ResultResponse) => {
        if (result.succeeded) {
          this.toastrService.success('Tiempo eliminado con éxito.');
          this.router.navigateByUrl(SiteUrls.timeControlRecords.home);
        } else {
          this.toastrService.error('Ha ocurrido un error al eliminar el tiempo.');
          logError(result.errors.join());
        }
      }
    });
  }

  handleTimeControlClose(timeControl: TimeControlRecordDetailsResponse): void {
    this.loadingTimeControl = true;
    const data = { timeControlId: timeControl.id };

    this.timeControlApiService
      .put<typeof data, ResultResponse>(data, ApiUrls.timeControl.finishTimeControlByStaff)
      .pipe(finalize(() => (this.loadingTimeControl = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Tiempo finalizado con éxito.');
            this.loadTimeControl();
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  private setBreadcrumb(): void {
    const urlDetails = urlReplaceParams(SiteUrls.timeControlRecords.details, { id: this.timeControlId });

    this.breadcrumb
      .add('Registro de tiempos', SiteUrls.timeControlRecords.home, '')
      .add('Detalles de tiempo', urlDetails, '', false);
  }

  private loadTimeControl(): void {
    const url = urlReplaceParams(ApiUrls.timeControl.getTimeControlWithEmployeeById, { id: this.timeControlId });
    this.loadingTimeControl = true;

    this.timeControlApiService
      .get<TimeControlRecordDetailsResponse>(url)
      .pipe(finalize(() => (this.loadingTimeControl = false)))
      .subscribe({
        next: (result: TimeControlRecordDetailsResponse) => {
          this.timeControl = result;
        }
      });
  }
}
