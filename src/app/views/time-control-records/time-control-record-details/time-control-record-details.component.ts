import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { ApiUrls } from '../../../core/urls/api-urls';
import { urlReplaceParams } from '../../../core/utils/common-utils';
import { TimeControl } from '../../../models/entities/time-control.model';
import { TimeControlApiService } from '../../../services/api/time-control-api.service';

@Component({
  selector: 'aw-time-control-record-details',
  standalone: true,
  imports: [ViewBaseComponent, ViewHeaderComponent],
  templateUrl: './time-control-record-details.component.html',
  styleUrl: './time-control-record-details.component.scss'
})
export class TimeControlRecordDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly timeControlApiService = inject(TimeControlApiService);

  private timeControlId = '';

  loadingTimeControl = false;
  timeControl: TimeControl | null = null;

  ngOnInit(): void {
    this.timeControlId = this.route.snapshot.paramMap.get('id') as string;
    this.loadTimeControl();
  }

  private loadTimeControl(): void {
    const url = urlReplaceParams(ApiUrls.timeControl.getTimeControlById, { id: this.timeControlId });
    this.loadingTimeControl = true;

    this.timeControlApiService
      .get<TimeControl>(url)
      .pipe(finalize(() => (this.loadingTimeControl = false)))
      .subscribe({
        next: (result: TimeControl) => {
          this.timeControl = result;
        }
      });
  }
}
