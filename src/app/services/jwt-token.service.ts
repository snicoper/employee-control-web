import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '@core/types/local-storage-keys';
import { ApiUrls } from '@core/utils/api-urls';
import { RefreshTokenModel, RefreshTokenResponse } from '@models/rest/_index';
import jwtDecode from 'jwt-decode';
import { AuthService } from './auth.service';
import { AuthRestService } from './rest/auth-rest.service';

@Injectable({ providedIn: 'root' })
export class JwtTokenService {
  private readonly route = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly authRestService = inject(AuthRestService);

  private tokenDecode: { [key: string]: unknown } = {};
  private accessToken = '';
  private refreshToken = '';

  constructor() {
    const accessToken = localStorage.getItem(LocalStorageKeys.accessToken) as string;
    const refreshToken = localStorage.getItem(LocalStorageKeys.refreshToken) as string;

    this.setTokens(accessToken, refreshToken, false);
  }

  setTokens(accessToken: string, refreshToken: string, storeTokens = true): void {
    if (!accessToken && !refreshToken) {
      return;
    }

    this.tokenDecode = jwtDecode(accessToken);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    if (storeTokens) {
      localStorage.setItem(LocalStorageKeys.accessToken, accessToken);
      localStorage.setItem(LocalStorageKeys.refreshToken, refreshToken);
    }

    this.authService.setAuthValue(true);
  }

  tryRefreshToken(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.accessToken && !this.isExpired()) {
        return;
      }

      const model = { refreshToken: this.refreshToken } as RefreshTokenModel;

      this.authRestService.post<RefreshTokenModel, RefreshTokenResponse>(model, ApiUrls.refreshToken).subscribe({
        next: (result: RefreshTokenResponse) => {
          if (result.accessToken) {
            this.setTokens(result.accessToken, result.refreshToken);
            resolve(true);
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.removeTokens();
            reject();
          }
        }
      });
    });
  }

  isExpired(): boolean {
    if (!this.accessToken || !this.tokenDecode) {
      this.clean();

      return true;
    }

    const expire = this.tokenDecode['exp'] as number;

    if (!expire || Date.now() >= expire * 1000) {
      this.clean();

      return true;
    }

    return false;
  }

  getToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  isInRole(role: string): boolean {
    return !!this.getRole(role);
  }

  getRole(role: string): string[] | string | null {
    const roles = this.getRoles();
    const index = roles.indexOf(role);

    if (index >= 0) {
      return roles[index];
    }

    return null;
  }

  getRoles(): string[] {
    const key = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

    if (!this.accessToken || !(key in this.tokenDecode)) {
      return [];
    }

    return this.tokenDecode[key] as string[];
  }

  getName(): string {
    const key = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

    if (!this.accessToken || !(key in this.tokenDecode)) {
      return '';
    }

    return this.tokenDecode[key] as string;
  }

  getSid(): string {
    const key = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid';

    if (!this.accessToken || !(key in this.tokenDecode)) {
      return '';
    }

    return this.tokenDecode[key] as string;
  }

  removeTokens(): void {
    localStorage.removeItem(LocalStorageKeys.refreshToken);
    this.refreshToken = '';
    this.clean(true);
  }

  clean(redirectToLogin = false): void {
    localStorage.removeItem(LocalStorageKeys.accessToken);
    this.authService.setAuthValue(false);
    this.accessToken = '';
    this.tokenDecode = {};

    if (redirectToLogin) {
      this.route.navigateByUrl('auth/login');
    }
  }
}
