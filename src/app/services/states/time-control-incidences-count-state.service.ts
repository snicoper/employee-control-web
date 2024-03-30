import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiUrls } from '../../core/urls/api-urls';
import { TimeControlIncidencesCountResponse } from '../../models/states/time-control-incidences-count-response.model';
import { TimeControlApiService } from '../api/time-control-api.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class TimeControlIncidencesCountStateService implements StateService<number> {
  private readonly timeControlApiService = inject(TimeControlApiService);

  private readonly incidences$ = signal(0);

  readonly incidences = computed(() => this.incidences$());

  refresh(): void {
    this.loadIncidencesCount();
  }

  get(): number {
    return this.incidences$();
  }

  clean(): void {
    this.incidences$.set(0);
  }

  loadIncidencesCount(): void {
    this.timeControlApiService
      .get<TimeControlIncidencesCountResponse>(ApiUrls.timeControl.getTimeControlIncidencesCount)
      .subscribe({
        next: (result: TimeControlIncidencesCountResponse) => {
          this.incidences$.set(result.incidences);
        }
      });
  }
}
