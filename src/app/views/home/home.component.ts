import { Component, inject } from '@angular/core';
import { ThemeColors } from '@aw/core/types/_index';
import { Roles } from '@aw/core/types/roles';
import { JwtService, LayoutService, ThemeColorService } from '@aw/services/_index';

@Component({
  selector: 'aw-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  readonly layoutService = inject(LayoutService);
  private readonly jwtService = inject(JwtService);
  private readonly themeColorService = inject(ThemeColorService);

  readonly roles = Roles;

  getUserId(): string {
    return this.jwtService.getSid();
  }

  getUserName(): string {
    return this.jwtService.getName();
  }

  getRoles(): string[] {
    return this.jwtService.getRoles();
  }

  handleLogOut(): void {
    this.jwtService.removeTokens();
  }

  handleToggleNavbar(): void {
    this.layoutService.navbarState$.update((value) => !value);
  }

  handleToggleSidebar(): void {
    this.layoutService.sidebarState$.update((value) => !value);
  }

  handleToggleFooter(): void {
    this.layoutService.footerState$.update((value) => !value);
  }

  handleChangeThemeColor(): void {
    const color = this.themeColorService.getThemeValue() === ThemeColors.dark ? ThemeColors.light : ThemeColors.dark;
    this.themeColorService.setTheme(color);
  }
}
