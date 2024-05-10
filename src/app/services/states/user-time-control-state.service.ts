import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiUrl } from '../../core/urls/api-urls';
import { CommonUtils } from '../../core/utils/common-utils';
import { TimeControlStateResponse } from '../../models/states/time-control-state-response.model';
import { HttpClientApiService } from '../api/http-client-api.service';
import { JwtService } from '../jwt.service';
import { StateService } from './state.service';

/** Estado del usuario activo. */
@Injectable({ providedIn: 'root' })
export class UserTimeControlStateService implements StateService<TimeControlStateResponse | null> {
  private readonly jwtService = inject(JwtService);
  private readonly httpClientApiService = inject(HttpClientApiService);

  private readonly timeControlStateResponse$ = signal<TimeControlStateResponse | null>(null);
  private readonly loadingTimeControlState$ = signal(true);

  readonly timeControl = computed(() => this.timeControlStateResponse$());
  readonly loadingTimeControl = computed(() => this.loadingTimeControlState$());

  refresh(): void {
    this.loadCurrentTimeControl();
  }

  get(): TimeControlStateResponse | null {
    return this.timeControlStateResponse$();
  }

  clean(): void {
    this.loadingTimeControlState$.set(false);
    this.timeControlStateResponse$.set(null);
  }

  private loadCurrentTimeControl(): void {
    this.loadingTimeControlState$.set(true);

    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.getTimeStateOpenByEmployeeId, {
      employeeId: this.jwtService.getSid()
    });

    this.httpClientApiService
      .get<TimeControlStateResponse>(url)
      .pipe(finalize(() => this.loadingTimeControlState$.set(false)))
      .subscribe({
        next: (result: TimeControlStateResponse) => {
          this.timeControlStateResponse$.set(result);
        }
      });
  }
}
