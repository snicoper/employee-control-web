import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SiteUrl } from '../../../core/urls/site-urls';
import { UserStatesService } from '../../../services/states/user-states.service';

@Component({
  selector: 'aw-logout',
  standalone: true,
  template: ''
})
export class LogoutComponent {
  private readonly router = inject(Router);
  private readonly userStatesService = inject(UserStatesService);

  constructor() {
    this.userStatesService.clean();
    this.router.navigateByUrl(SiteUrl.auth.login);
  }
}
