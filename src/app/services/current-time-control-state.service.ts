import { Injectable, computed, signal } from '@angular/core';
import { TimeState } from './../models/entities/types/time-state.model';

@Injectable({ providedIn: 'root' })
export class CurrentTimeControlStateService {
  private readonly currentState$ = signal(TimeState.close);

  readonly currentState = computed(() => this.currentState$());

  getCurrentStateValue(): TimeState {
    return this.currentState$();
  }

  open(): void {
    this.currentState$.set(TimeState.open);
  }

  close(): void {
    this.currentState$.set(TimeState.close);
  }

  set(timeState: TimeState): void {
    this.currentState$.set(timeState);
  }
}
