import { Component, computed, inject } from '@angular/core';
import { AppEnvironments } from '@aw/core/config/_index';
import { SiteUrls } from '@aw/core/urls/_index';
import { AuthService, JwtService, LayoutService } from '@aw/services/_index';

@Component({
  selector: 'aw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private readonly jwtService = inject(JwtService);
  private readonly authService = inject(AuthService);
  private readonly layoutService = inject(LayoutService);

  readonly userName = this.jwtService.getName();
  readonly siteName = AppEnvironments.siteName;
  readonly siteUrls = SiteUrls;

  readonly sidebarState$ = computed(() => this.layoutService.sidebarState$());
  readonly authState$ = computed(() => this.authService.authValue$);

  toggleSidebarState(): void {
    this.layoutService.toggleSidebarState();
  }

  logOut(): void {
    this.jwtService.removeTokens();
  }
}
