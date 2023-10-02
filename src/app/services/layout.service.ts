import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  /** Signals. */
  showNavbar$ = signal(true);
  showSidebar$ = signal(true);
  showFooter$ = signal(true);
}
