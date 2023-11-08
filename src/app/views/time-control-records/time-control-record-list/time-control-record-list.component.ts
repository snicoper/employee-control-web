import { Component, inject } from '@angular/core';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { TableHeaderConfig } from '@aw/components/tables/table-header/table-header.config';
import { OrderTypes } from '@aw/core/features/api-result/_index';
import { ApiResult } from '@aw/core/features/api-result/api-result';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { TimeControlApiService } from '@aw/services/api/_index';
import { JwtService } from '@aw/services/jwt.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { TimeControlRecordEditComponent } from '../time-control-record-edit/time-control-record-edit.component';
import { TimeState } from './../../../models/entities/types/time-state.model';
import { SimpleGeolocationService } from './../../../services/simple-geolocation.service';
import { TimeControlRecordResponse } from './time-contol-record-esponse.model';
import { timeControlRecordListTableHeaders } from './time-control-record-list-table-header';

@Component({
  selector: 'aw-time-control-record-list',
  templateUrl: './time-control-record-list.component.html'
})
export class TimeControlRecordListComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly jwtService = inject(JwtService);
  private readonly simpleGeolocationService = inject(SimpleGeolocationService);
  private readonly bsModalService = inject(BsModalService);

  readonly breadcrumb = new BreadcrumbCollection();

  apiResult = new ApiResult<TimeControlRecordResponse>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;
  siteUrls = SiteUrls;
  timeState = TimeState;
  from?: Date | string = 'null';
  to?: Date | string = 'null';
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
      class: 'modal-lg',
      keyboard: false,
      initialState: {
        timeControlId: timeControl.id
      }
    };

    this.bsModalRef = this.bsModalService.show(TimeControlRecordEditComponent, initialState);
  }

  handleReloadData(): void {
    this.loadTimeControlRecords();
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
