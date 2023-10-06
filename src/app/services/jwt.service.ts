import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '@aw/core/types/_index';
import { ApiUrls, SiteUrls } from '@aw/core/utils/_index';
import { RefreshTokenModel, RefreshTokenResponseModel } from '@aw/models/api/_index';
import jwtDecode from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { AuthApiService } from './api/_index';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class JwtService {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly authApiService = inject(AuthApiService);
  private readonly localStorageService = inject(LocalStorageService);

  /** Comprueba si el token se esta refrescando. */
  readonly isRefreshing$ = signal(false);

  /** Último valor de refresco. */
  readonly refreshedTokens$ = signal<RefreshTokenResponseModel | null>(null);

  /** Token data. */
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

  refreshingTokens(): Observable<RefreshTokenResponseModel> {
    const model = { refreshToken: this.refreshToken } as RefreshTokenModel;

    return this.authApiService.post<RefreshTokenModel, RefreshTokenResponseModel>(model, ApiUrls.refreshToken).pipe(
      tap((result) => {
        this.setTokens(result.accessToken, result.refreshToken);
      })
    );
  }

  isExpired(): boolean {
    if (!this.accessToken || !this.tokenDecode) {
      return true;
    }

    const expiry = this.tokenDecode['exp'] as number;

    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  getToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  isInRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  getRole(role: string): string[] | string {
    const index = this.getRoles().indexOf(role);

    return index >= 0 ? this.getRoles()[index] : '';
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

    this.router.navigateByUrl(SiteUrls.login);
  }
}
