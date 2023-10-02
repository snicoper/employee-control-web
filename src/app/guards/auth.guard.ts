import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SiteUrls } from '../core/utils/_index';
import { JwtTokenService } from '../services/_index';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private jwtTokenService: JwtTokenService,
    private toastr: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.jwtTokenService.getToken()) {
      this.toastr.error('Requiere autorización para acceder a la página.');
      this.router.navigate([SiteUrls.login], { queryParams: { returnUrl: state.url } });

      return false;
    }

    const userRoles = this.jwtTokenService.getRoles();
    const { roles } = route.data;

    if (!roles) {
      return true;
    }

    for (let role of roles) {
      if (!userRoles.includes(role)) {
        this.toastr.error('Requiere permisos para acceder a la página.');
        this.router.navigate([SiteUrls.login], { queryParams: { returnUrl: state.url } });

        return false;
      }
    }

    return true;
  }
}
