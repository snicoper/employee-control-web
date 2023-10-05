import { HttpErrorResponse } from '@angular/common/http';
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

    if (!roles) {
      return true;
    }

    if (this.jwtService.isExpired() || !this.jwtService.getRoles()) {
      this.jwtService.tryRefreshToken().subscribe({
        next: () => debugMessages('Refresh tokens'),
        error: (error: HttpErrorResponse) => {
          debugErrors(error.message);
          this.navigateToLogin(state.url);

          return false;
        }
      });
    }

    const userRoles = this.jwtService.getRoles();

    for (const role of roles) {
      if (!userRoles.includes(role)) {
        this.navigateToLogin(state.url);

        return false;
      }
    }

    return true;
  }

  private navigateToLogin(returnUrl: string): void {
    this.toastr.error('Requiere autorización para acceder a la página.');
    this.router.navigate([SiteUrls.login], { queryParams: { returnUrl: returnUrl } });
  }
}
