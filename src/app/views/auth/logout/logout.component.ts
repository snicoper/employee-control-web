import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { JwtService, UserStatesService } from '@aw/services/_index';

@Component({
  selector: 'aw-logout',
  standalone: true,
  template: ''
})
export class LogoutComponent {
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);
  private readonly userStatesService = inject(UserStatesService);

  constructor() {
    this.jwtService.removeTokens();
    this.userStatesService.clean();
    this.router.navigateByUrl(SiteUrls.auth.login);
  }
}
