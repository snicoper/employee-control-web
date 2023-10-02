import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  /** Signals. */
  readonly showNavbar$ = signal(true);
  readonly showSidebar$ = signal(true);
  readonly showFooter$ = signal(true);
}
