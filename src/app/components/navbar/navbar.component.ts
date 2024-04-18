import { Component, computed, inject, output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AppEnvironment } from '../../core/config/app-environment';
import { Role } from '../../core/types/role';
import { ThemeColor } from '../../core/types/theme-color';
import { SiteUrl } from '../../core/urls/site-urls';
import { RequiredRoleDirective } from '../../directives/required-role.directive';
import { TimeControlIncidencesCountStateService } from '../../services/states/time-control-incidences-count-state.service';
import { ThemeManagerService } from '../../services/theme-manager.service';

@Component({
  selector: 'aw-navbar',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule, RequiredRoleDirective],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private readonly themeManagerService = inject(ThemeManagerService);
  private readonly timeControlIncidencesCountStateService = inject(TimeControlIncidencesCountStateService);

  changeSidenavState = output<void>();

  readonly theme = computed(() => this.themeManagerService.theme());
  readonly timeControlIncidencesCount = computed(() => this.timeControlIncidencesCountStateService.incidences());

  themeColor = ThemeColor;
  siteName = AppEnvironment.siteName;
  siteUrl = SiteUrl;
  role = Role;

  /** Alternar color del theme. */
  handleToggleThemeColor(): void {
    this.themeManagerService.toggle();
  }

  /** Emitir cambio de estado de sidenav. */
  handleToggleSidenavState(): void {
    this.changeSidenavState.emit();
  }
}
