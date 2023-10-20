import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  /** Signals. */
  readonly navbarState$ = signal(true);
  readonly sidebarState$ = signal(true);
  readonly footerState$ = signal(true);
}
