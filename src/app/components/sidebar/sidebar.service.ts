import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SidebarService {
  private sidebarState$ = new BehaviorSubject<boolean>(true);

  get sidebarState(): Observable<boolean> {
    return this.sidebarState$.asObservable();
  }

  get sidebarStateValue(): boolean {
    return this.sidebarState$.getValue();
  }

  toggle(): void {
    this.sidebarState$.next(!this.sidebarStateValue);
  }

  setSidebarStateValue(value: boolean): void {
    this.sidebarState$.next(value);
  }
}
