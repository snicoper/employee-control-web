import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private showNavbar$ = new BehaviorSubject<boolean>(true);
  private showSidebar$ = new BehaviorSubject<boolean>(true);
  private showFooter$ = new BehaviorSubject<boolean>(true);

  /** Navbar functions. */
  get showNavbar(): Observable<boolean> {
    return this.showNavbar$.asObservable();
  }

  get showNavbarValue(): boolean {
    return this.showNavbar$.getValue();
  }

  toggleNavbar(): void {
    this.showNavbar$.next(!this.showNavbarValue);
  }

  setValueNavbar(value: boolean): void {
    this.showNavbar$.next(value);
  }

  /** Sidebar functions. */
  get showSidebar(): Observable<boolean> {
    return this.showSidebar$.asObservable();
  }

  get showSidebarValue(): boolean {
    return this.showSidebar$.getValue();
  }

  toggleSidebar(): void {
    this.showSidebar$.next(!this.showSidebarValue);
  }

  setValueSidebar(value: boolean): void {
    this.showSidebar$.next(value);
  }

  /** Footer functions. */
  get showFooter(): Observable<boolean> {
    return this.showFooter$.asObservable();
  }

  get showFooterValue(): boolean {
    return this.showFooter$.getValue();
  }

  toggleFooter(): void {
    this.showFooter$.next(!this.showFooterValue);
  }

  setValueFooter(value: boolean): void {
    this.showFooter$.next(value);
  }
}
