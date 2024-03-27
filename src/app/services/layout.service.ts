import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  readonly navbarState$ = signal(true);
  readonly sidebarMenuState$ = signal(true);
  readonly sidebarToolbarState$ = signal(true);
  readonly footerState$ = signal(true);

  toggleNavbarState(): void {
    this.navbarState$.update((value) => !value);
  }

  toggleSidebarState(): void {
    this.sidebarMenuState$.update((value) => !value);
  }

  toggleSidebarToolbarState(): void {
    this.sidebarToolbarState$.update((value) => !value);
  }

  toggleFooterState(): void {
    this.footerState$.update((value) => !value);
  }
}
