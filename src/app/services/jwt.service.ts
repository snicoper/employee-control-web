import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '@aw/core/types/_index';
import { ApiUrls, SiteUrls } from '@aw/core/utils/_index';
import { RefreshTokenModel, RefreshTokenResponse } from '@aw/models/rest/_index';
import jwtDecode from 'jwt-decode';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { AuthRestService } from './rest/auth-rest.service';

@Injectable({ providedIn: 'root' })
export class JwtService {
  private readonly route = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly authRestService = inject(AuthRestService);
  private readonly localStorageService = inject(LocalStorageService);

  private tokenDecode: { [key: string]: unknown } = {};
  private accessToken = '';
  private refreshToken = '';

  constructor() {
    const accessToken = this.localStorageService.get(LocalStorageKeys.accessToken);
    const refreshToken = this.localStorageService.get(LocalStorageKeys.refreshToken);

    this.setTokens(accessToken, refreshToken, false);
  }

  setTokens(accessToken: string, refreshToken: string, storeTokens = true): void {
    if (!accessToken || !refreshToken) {
      return;
    }

    this.tokenDecode = jwtDecode(accessToken);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    if (storeTokens) {
      this.localStorageService.set(LocalStorageKeys.accessToken, accessToken);
      this.localStorageService.set(LocalStorageKeys.refreshToken, refreshToken);
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
          }

          reject(new Error(error.error));
        }
      });
    });
  }

  isExpired(): boolean {
    if (!this.accessToken || !this.tokenDecode) {
      return true;
    }

    const expire = this.tokenDecode['exp'] as number;

    return Date.now() >= expire * 1000;
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
    this.localStorageService.remove(LocalStorageKeys.refreshToken);
    this.localStorageService.remove(LocalStorageKeys.accessToken);
    this.refreshToken = '';
    this.accessToken = '';
    this.tokenDecode = {};

    this.authService.setAuthValue(false);

    this.route.navigateByUrl(SiteUrls.login);
  }
}
