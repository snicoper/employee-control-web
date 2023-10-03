import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SiteUrls } from '@core/utils/_index';
import { JwtTokenService } from '@services/_index';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private readonly router = inject(Router);
  private readonly jwtTokenService = inject(JwtTokenService);
  private readonly toastr = inject(ToastrService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.jwtTokenService.getRefreshToken()) {
      this.navigateToLogin(state);

      return false;
    }

    this.jwtTokenService
      .tryRefreshToken()
      .then(() => this.checkRoles(route, state))
      .catch(() => this.navigateToLogin(state));

    return true;
  }

  private checkRoles(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRoles = this.jwtTokenService.getRoles();
    const { roles } = route.data;

    if (!roles) {
      return true;
    }

    for (const role of roles) {
      if (!userRoles.includes(role)) {
        this.navigateToLogin(state);

        return false;
      }
    }

    return true;
  }

  private navigateToLogin(state: RouterStateSnapshot): void {
    this.toastr.error('Requiere autorización para acceder a la página.');
    this.router.navigate([SiteUrls.login], { queryParams: { returnUrl: state.url } });
  }
}
