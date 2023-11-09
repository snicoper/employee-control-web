import { Component, inject } from '@angular/core';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { TableHeaderConfig } from '@aw/components/tables/table-header/table-header.config';
import { logError } from '@aw/core/errors/_index';
import { OrderTypes } from '@aw/core/features/api-result/_index';
import { ApiResult } from '@aw/core/features/api-result/api-result';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { ResultResponse } from '@aw/models/_index';
import { ClosedBy } from '@aw/models/entities/types/closed-by.model';
import { TimeControlApiService } from '@aw/services/api/_index';
import { JwtService } from '@aw/services/jwt.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { TimeControlRecordEditComponent } from '../time-control-record-edit/time-control-record-edit.component';
import { TimeControlRecordResponse } from './time-contol-record-esponse.model';
import { timeControlRecordListTableHeaders } from './time-control-record-list-table-header';
import { SimpleGeolocationService } from '@aw/services/simple-geolocation.service';
import { TimeState } from '@aw/models/entities/types/_index';

@Component({
  selector: 'aw-time-control-record-list',
  templateUrl: './time-control-record-list.component.html'
})
export class TimeControlRecordListComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly jwtService = inject(JwtService);
  private readonly simpleGeolocationService = inject(SimpleGeolocationService);
  private readonly bsModalService = inject(BsModalService);
  private readonly toastrService = inject(ToastrService);

  readonly breadcrumb = new BreadcrumbCollection();

  apiResult = new ApiResult<TimeControlRecordResponse>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;
  siteUrls = SiteUrls;
  timeState = TimeState;
  closedBy = ClosedBy;
  from?: Date | string = 'null';
  to?: Date | string = 'null';
  loadingTimeState = false;
  bsModalRef?: BsModalRef;

  constructor() {
    this.apiResult.addOrder('start', OrderTypes.ascending, 1);

    this.configureTableHeaders();
    this.setBreadcrumb();
    this.loadTimeControlRecords();
  }

  getStartOpenStreetMapLink(timeControl: TimeControlRecordResponse): string | null {
    if (timeControl.latitudeStart && timeControl.longitudeStart) {
      return this.simpleGeolocationService.getOpenStreetMapLink(timeControl.latitudeStart, timeControl.longitudeStart);
    }

    return null;
  }

  getFinishOpenStreetMapLink(timeControl: TimeControlRecordResponse): string | null {
    if (timeControl.latitudeFinish && timeControl.longitudeFinish) {
      return this.simpleGeolocationService.getOpenStreetMapLink(
        timeControl.latitudeFinish,
        timeControl.longitudeFinish
      );
    }

    return null;
  }

  handleTimeControlModalEdit(timeControl: TimeControlRecordResponse): void {
    const initialState: ModalOptions = {
      keyboard: false,
      initialState: {
        timeControlId: timeControl.id
      }
    };

    this.bsModalRef = this.bsModalService.show(TimeControlRecordEditComponent, initialState);
    this.bsModalRef.content.saveForm.subscribe({
      next: (result: boolean) => {
        if (result) {
          this.loadTimeControlRecords();
        }
      }
    });
  }

  handleReloadData(): void {
    this.loadTimeControlRecords();
  }

  handleCloseTimeControl(timeControl: TimeControlRecordResponse): void {
    this.loadingTimeState = true;
    const data = { timeControlId: timeControl.id };

    this.timeControlApiService
      .post<typeof data, ResultResponse>(data, ApiUrls.timeControl.finishTimeControlByStaff)
      .pipe(finalize(() => (this.loadingTimeState = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.loadTimeControlRecords();
            this.toastrService.success('Tiempo finalizado con éxito.');
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  handleClickClean(event: ApiResult<TimeControlRecordResponse>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(timeControlRecordListTableHeaders);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Registro de tiempos', SiteUrls.timeControl.home, '', false);
  }

  private loadTimeControlRecords(): void {
    this.loading = false;
    const url = urlReplaceParams(ApiUrls.timeControl.getTimesControlByCompanyIdPaginated, {
      companyId: this.jwtService.getCompanyId(),
      from: this.from as string,
      to: this.to as string
    });

    this.timeControlApiService
      .getPaginated<TimeControlRecordResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<TimeControlRecordResponse>) => {
          this.apiResult = result;
        }
      });
  }
}
