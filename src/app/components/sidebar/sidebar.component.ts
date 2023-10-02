import { Component, computed, inject } from '@angular/core';
import { SiteUrls } from '../../core/utils/_index';
import { AuthService, JwtTokenService } from '../../services/_index';
import { SidebarStates } from './sidebar-states';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'aw-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  /** Injects. */
  private sidebarService = inject(SidebarService);
  private jwtTokenService = inject(JwtTokenService);
  private authService = inject(AuthService);

  /** Properties. */
  siteUrls = SiteUrls;
  sidebarStates = SidebarStates;

  /** Computed. */
  readonly sidebarState$ = computed(() => this.sidebarService.sidebarState$());
  readonly authState$ = computed(() => this.authService.authValue$());

  handleClick(): void {
    this.sidebarService.toggle();
  }

  handleLogOut(): void {
    this.jwtTokenService.clean();
  }
}
