import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageItems } from '@core/types/local-storage-items';
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
    this.accessToken = localStorage.getItem(LocalStorageItems.accessToken) as string;
    this.refreshToken = localStorage.getItem(LocalStorageItems.refreshToken) as string;

    this.setToken(this.accessToken, this.refreshToken);
  }

  setToken(accessToken: string, refreshToken: string): void {
    if (!accessToken || !refreshToken) {
      return;
    }

    this.clean();
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.tokenDecode = jwtDecode(accessToken);

    if (!Object.hasOwn(this.tokenDecode, 'exp')) {
      this.clean();

      return;
    }

    if (!this.isExpired()) {
      localStorage.setItem(LocalStorageItems.accessToken, this.accessToken);
      localStorage.setItem(LocalStorageItems.refreshToken, this.refreshToken);
    }

    this.authService.setAuthValue(true);
  }

  tryRefreshToken(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.isExpired()) {
        return;
      }

      const model = { refreshToken: this.refreshToken } as RefreshTokenModel;

      this.authRestService.post<RefreshTokenModel, RefreshTokenResponse>(model, ApiUrls.refreshToken).subscribe({
        next: (result: RefreshTokenResponse) => {
          if (result.accessToken) {
            this.setToken(result.accessToken, result.refreshToken);
            resolve(true);
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.clean();
            localStorage.removeItem(LocalStorageItems.refreshToken);
            reject();
          }
        }
      });
    });
  }

  isExpired(): boolean {
    const exp = this.tokenDecode['exp'] as string;
    const expired = parseInt(exp);

    if (!expired || Date.now() >= expired * 1000) {
      this.clean();

      return true;
    }

    return false;
  }

  getToken(): string {
    if (!this.accessToken || this.isExpired()) {
      if (this.accessToken) {
        this.tryRefreshToken();
      }

      this.clean();
    }

    return this.accessToken;
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

  clean(redirectToLogin = false): void {
    localStorage.removeItem(LocalStorageItems.accessToken);
    this.authService.setAuthValue(false);
    this.accessToken = '';
    this.tokenDecode = {};

    if (redirectToLogin) {
      this.route.navigateByUrl('auth/login');
    }
  }
}
