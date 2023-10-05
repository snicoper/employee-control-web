import { Component, inject } from '@angular/core';
import { ThemeColors } from '@aw/core/types/_index';
import { JwtService, LayoutService, ThemeColorService } from '@aw/services/_index';

@Component({
  selector: 'aw-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  layoutService = inject(LayoutService);
  private jwtService = inject(JwtService);
  private themeColorService = inject(ThemeColorService);

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
    this.layoutService.showNavbar$.update((value) => !value);
  }

  handleToggleSidebar(): void {
    this.layoutService.showSidebar$.update((value) => !value);
  }

  handleToggleFooter(): void {
    this.layoutService.showFooter$.update((value) => !value);
  }

  handleChangeThemeColor(): void {
    const color = this.themeColorService.getThemeValue() === ThemeColors.dark ? ThemeColors.light : ThemeColors.dark;
    this.themeColorService.setTheme(color);
  }
}
