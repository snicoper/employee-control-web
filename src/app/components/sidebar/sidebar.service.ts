import { Injectable, signal } from '@angular/core';

@Injectable()
export class SidebarService {
  readonly sidebarState$ = signal(true);
}
