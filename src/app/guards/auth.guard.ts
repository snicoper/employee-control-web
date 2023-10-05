import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SiteUrls, debugErrors, debugMessages } from '@aw/core/utils/_index';
import { JwtService } from '@aw/services/_index';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private readonly router = inject(Router);
  private readonly jwtService = inject(JwtService);
  private readonly toastr = inject(ToastrService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const { roles } = route.data;

    if ((roles && this.jwtService.isExpired()) || !this.jwtService.getRoles()) {
      this.jwtService
        .tryRefreshToken()
        .then((result: boolean) => {
          debugMessages('Refresh tokens');

          if (!result) {
            this.navigateToLogin(state.url);
          }
        })
        .catch((error: Error) => {
          debugErrors(error.message);

          this.navigateToLogin(state.url);
        });
    }

    const userRoles = this.jwtService.getRoles();

    if (!roles) {
      return true;
    }

    for (const role of roles) {
      if (!userRoles.includes(role)) {
        this.navigateToLogin(state.url);

        return false;
      }
    }

    return true;
  }

  private navigateToLogin(url: string): void {
    this.toastr.error('Requiere autorización para acceder a la página.');
    this.router.navigate([SiteUrls.login], { queryParams: { returnUrl: url } });
  }
}
