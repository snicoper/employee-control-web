import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SiteUrls } from '@core/utils/_index';
import { JwtService } from '@services/_index';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private readonly router = inject(Router);
  private readonly jwtService = inject(JwtService);
  private readonly toastr = inject(ToastrService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.jwtService.getRefreshToken()) {
      this.navigateToLogin(state);

      return false;
    }

    this.jwtService
      .tryRefreshToken()
      .then(() => this.checkRoles(route, state))
      .catch(() => this.navigateToLogin(state));

    return true;
  }

  private checkRoles(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRoles = this.jwtService.getRoles();
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
