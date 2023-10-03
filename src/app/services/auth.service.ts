import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth$ = signal(false);

  readonly authValue$ = computed(() => this.auth$());

  setAuthValue(auth: boolean): void {
    this.auth$.set(auth);
  }
}
