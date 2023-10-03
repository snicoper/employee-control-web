import { Component, computed, inject } from '@angular/core';
import { SidebarStates } from '@components/sidebar/sidebar-states';
import { SidebarService } from '@components/sidebar/sidebar.service';
import { AppEnvironments, SiteUrls } from '@core/utils/_index';
import { AuthService, JwtTokenService } from '@services/_index';

@Component({
  selector: 'aw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private readonly sidebarService = inject(SidebarService);
  private readonly jwtTokenService = inject(JwtTokenService);
  private readonly authService = inject(AuthService);

  userName = this.jwtTokenService.getName();
  siteName = AppEnvironments.siteName;
  siteUrls = SiteUrls;
  sidebarStates = SidebarStates;

  readonly sidebarState$ = computed(() => this.sidebarService.sidebarState$());
  readonly authState$ = computed(() => this.authService.authValue$);

  toggleSidebarState(): void {
    this.sidebarService.toggle();
  }

  logOut(): void {
    this.jwtTokenService.clean();
  }
}
