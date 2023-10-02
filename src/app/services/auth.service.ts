import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Signals. */
  private readonly auth$ = signal(false);

  /** Computed. */
  readonly authValue$ = computed(() => this.auth$());

  setAuthValue(auth: boolean): void {
    this.auth$.set(auth);
  }
}
