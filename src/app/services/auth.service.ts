import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Signals. */
  private auth$ = signal(false);

  /** Computed. */
  authValue$ = computed(() => this.auth$());

  setAuthValue(auth: boolean): void {
    this.auth$.set(auth);
  }
}
