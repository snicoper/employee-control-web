import { Injectable, signal } from '@angular/core';
import { SidebarStates } from './sidebar-states';

@Injectable()
export class SidebarService {
  readonly sidebarState$ = signal(SidebarStates.open);

  toggle(): void {
    const newState = this.sidebarState$() === SidebarStates.open ? SidebarStates.closed : SidebarStates.open;
    this.sidebarState$.set(newState);
  }
}
