import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth$ = new BehaviorSubject<boolean>(false);

  get isAuth(): Observable<boolean> {
    return this.auth$.asObservable();
  }

  get isAuthValue(): boolean {
    return this.auth$.getValue();
  }

  logIn(): void {
    this.auth$.next(true);
  }

  logOut(): void {
    this.auth$.next(false);
  }
}
