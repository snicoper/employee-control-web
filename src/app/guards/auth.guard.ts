import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SiteUrls } from '@aw/core/utils/_index';
import { JwtService } from '@aw/services/_index';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private readonly router = inject(Router);
  private readonly jwtService = inject(JwtService);
  private readonly toastr = inject(ToastrService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRoles = this.jwtService.getRoles();
    const { roles } = route.data;

    if (!roles) {
      return true;
    }

    for (const role of roles) {
      if (!userRoles.includes(role)) {
        this.toastr.error('Requiere autorización para acceder a la página.');
        this.router.navigate([SiteUrls.login], { queryParams: { returnUrl: state.url } });

        return false;
      }
    }

    return true;
  }
}
