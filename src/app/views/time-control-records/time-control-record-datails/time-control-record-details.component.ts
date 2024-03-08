import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { urlReplaceParams } from '@aw/core/utils/common-utils';
import { TimeControl } from '@aw/models/entities/time-control.model';
import { TimeControlApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';

@Component({
  selector: 'aw-time-control-record-details',
  templateUrl: './time-control-record-details.component.html'
})
export class TimeControlRecordDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly timeControlApiService = inject(TimeControlApiService);

  private readonly timeControlId: string;

  timeControl: TimeControl | undefined;
  timeControlLoading = false;

  constructor() {
    this.timeControlId = this.route.snapshot.paramMap.get('id') as string;
    this.loadTimeControl();
  }

  private loadTimeControl(): void {
    this.timeControlLoading = true;
    const url = urlReplaceParams(ApiUrls.timeControl.getTimeControlById, { id: this.timeControlId });

    this.timeControlApiService
      .get<TimeControl>(url)
      .pipe(finalize(() => (this.timeControlLoading = false)))
      .subscribe({
        next: (result: TimeControl) => {
          this.timeControl = result;
        }
      });
  }
}
