import { Injectable, signal } from '@angular/core';

@Injectable()
export class SidebarService {
  sidebarState$ = signal(true);
}
