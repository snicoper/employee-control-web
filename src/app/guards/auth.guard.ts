import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { logError } from '@aw/core/errors/_index';
import { SiteUrls } from '@aw/core/urls/_index';
import { AuthService, JwtService } from '@aw/services/_index';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly jwtService = inject(JwtService);
  private readonly toastr = inject(ToastrService);

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.authService.authValue$() || !this.jwtService.existsTokens()) {
      this.redirectToLogin(state.url);

      return false;
    }

    const { roles } = route.data;

    if (!roles) {
      return true;
    }

    for (const role of roles) {
      if (!this.jwtService.isInRole(role)) {
        logError(`Role requerido para acceder a esta pagina: ${role}`);

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
