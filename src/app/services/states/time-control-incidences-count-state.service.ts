import { Injectable, computed, inject, signal } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { AppEnvironments } from '../../core/config/app-environments';
import { ApiUrls } from '../../core/urls/api-urls';
import { TimeControlIncidencesCountStateResponse } from '../../models/states/time-control-incidences-count-state-response.model';
import { TimeControlApiService } from '../api/time-control-api.service';
import { StateService } from './state.service';

/**
 * Estado de notificaciones de incidencias de TimeControl.
 * Utiliza SignalR para obtener notificaciones en tiempo real.
 */
@Injectable({ providedIn: 'root' })
export class TimeControlIncidencesCountStateService implements StateService<number> {
  private readonly timeControlApiService = inject(TimeControlApiService);

  private readonly incidences$ = signal(0);
  private readonly hubConnectionBuilder = new HubConnectionBuilder();

  readonly incidences = computed(() => this.incidences$());

  constructor() {
    this.addListener();
  }

  refresh(): void {
    this.loadIncidencesCount();
  }

  get(): number {
    return this.incidences$();
  }

  clean(): void {
    this.incidences$.set(0);
  }

  private loadIncidencesCount(): void {
    this.timeControlApiService
      .get<TimeControlIncidencesCountStateResponse>(ApiUrls.timeControl.getTimeControlIncidencesCount)
      .subscribe({
        next: (result: TimeControlIncidencesCountStateResponse) => {
          this.incidences$.set(result.incidences);
        }
      });
  }

  private addListener(): void {
    const hubConnection = this.hubConnectionBuilder.withUrl(AppEnvironments.baseHubUrl).build();

    hubConnection.on('NotificationTimeControlIncidenceHub', () => {
      this.refresh();
    });

    hubConnection.start();
  }
}
