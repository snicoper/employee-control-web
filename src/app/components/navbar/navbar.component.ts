import { Component, computed, inject } from '@angular/core';
import { AppEnvironments, SiteUrls } from '../../core/utils/_index';
import { AuthService, JwtTokenService } from '../../services/_index';
import { SidebarStates } from '../sidebar/sidebar-states';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'aw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  /** Injects. */
  private sidebarService = inject(SidebarService);
  private jwtTokenService = inject(JwtTokenService);
  private authService = inject(AuthService);

  /** Properties. */
  userName = this.jwtTokenService.getName();
  siteName = AppEnvironments.siteName;
  siteUrls = SiteUrls;
  sidebarStates = SidebarStates;

  /** Computed. */
  readonly sidebarState$ = computed(() => this.sidebarService.sidebarState$());
  readonly authState$ = computed(() => this.authService.authValue$);

  toggleSidebarState(): void {
    this.sidebarService.toggle();
  }

  logOut(): void {
    this.jwtTokenService.clean();
  }
}
