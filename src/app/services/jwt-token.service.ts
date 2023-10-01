import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class JwtTokenService {
  private token = '';
  private tokenDecode: { [key: string]: any } = {};
  private isTokenExpired = true;

  constructor(
    private route: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {
    const token = this.localStorageService.get('token') as string;
    this.setToken(token);
  }

  setToken(token: string): void {
    if (!token) {
      return;
    }

    this.clean();
    this.token = token;
    this.tokenDecode = jwtDecode(token);

    if (!this.tokenDecode.hasOwnProperty('exp')) {
      this.clean();

      return;
    }

    if (!this.isExpired()) {
      this.localStorageService.set('token', this.token);
    }

    this.authService.logIn();
  }

  isExpired(): boolean {
    const expired = parseInt(this.tokenDecode['exp']);

    if (Date.now() >= expired * 1000) {
      this.clean();

      return true;
    }

    this.isTokenExpired = false;

    return this.isTokenExpired;
  }

  getToken(): string {
    if (!this.token || this.isExpired()) {
      this.clean();

      return '';
    }

    return this.token;
  }

  getRole(role: string): string[] | string | null {
    const roles = this.getRoles();
    const index = roles.indexOf(role);

    if (index >= 0) {
      return roles[index];
    }

    return null;
  }

  isInRole(role: string): boolean {
    return !!this.getRole(role);
  }

  getRoles(): string[] {
    const key = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    if (!this.token || !(key in this.tokenDecode)) {
      return [];
    }

    return this.tokenDecode[key];
  }

  getName(): string {
    const key = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
    if (!this.token || !(key in this.tokenDecode)) {
      return '';
    }

    return this.tokenDecode[key];
  }

  getSid(): string {
    const key = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid';
    if (!this.token || !(key in this.tokenDecode)) {
      return '';
    }

    return this.tokenDecode[key];
  }

  clean(redirectToLogin = false): void {
    this.authService.logOut();
    this.localStorageService.remove('token');
    this.token = '';
    this.tokenDecode = {};
    this.isTokenExpired = true;

    if (redirectToLogin) {
      this.route.navigateByUrl('auth/login');
    }
  }
}
