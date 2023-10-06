import { Component, computed, inject } from '@angular/core';
import { SiteUrls } from '@aw/core/urls/_index';
import { AuthService, JwtService } from '@aw/services/_index';
import { SidebarStates } from './sidebar-states';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'aw-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private readonly sidebarService = inject(SidebarService);
  private readonly jwtService = inject(JwtService);
  private readonly authService = inject(AuthService);

  siteUrls = SiteUrls;
  sidebarStates = SidebarStates;

  readonly sidebarState$ = computed(() => this.sidebarService.sidebarState$());
  readonly authState$ = computed(() => this.authService.authValue$());

  handleClick(): void {
    this.sidebarService.toggle();
  }

  handleLogOut(): void {
    this.jwtService.removeTokens();
  }
}
