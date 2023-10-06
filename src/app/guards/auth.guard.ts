import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SiteUrls, debugMessage } from '@aw/core/utils/_index';
import { JwtService } from '@aw/services/_index';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private readonly router = inject(Router);
  private readonly jwtService = inject(JwtService);
  private readonly toastr = inject(ToastrService);

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.jwtService.getToken()) {
      this.redirectToLogin(state.url);

      return false;
    }

    debugMessage('El valor de 2 + 2 es: {valor}', { valor: '4' });

    const { roles } = route.data;

    if (!roles) {
      return true;
    }

    if (this.jwtService.isExpired() && this.jwtService.getRefreshToken()) {
      const isRefreshSuccess = await this.jwtService.refreshingTokens();

      if (!isRefreshSuccess) {
        this.redirectToLogin(state.url);

        return false;
      }
    }

    return this.checkRequiredRoles(roles);
  }

  private checkRequiredRoles(roles: string[]): boolean {
    for (const role of roles) {
      if (!this.jwtService.isInRole(role)) {
        return false;
      }
    }

    return true;
  }

  private redirectToLogin(redirectUrl: string): void {
    this.toastr.error('Requiere autorización para acceder a la página.');
    this.router.navigate([SiteUrls.login], { queryParams: { returnUrl: redirectUrl } });
  }
}
