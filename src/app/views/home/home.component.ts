import { Component, inject } from '@angular/core';
import { ThemeColor } from '@core/types/_index';
import { JwtTokenService, LayoutService, ThemeColorService } from '@services/_index';

@Component({
  selector: 'aw-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private layoutService = inject(LayoutService);
  private jwtTokenService = inject(JwtTokenService);
  private themeColorService = inject(ThemeColorService);

  getUserId(): string {
    return this.jwtTokenService.getSid();
  }

  getUserName(): string {
    return this.jwtTokenService.getName();
  }

  getRoles(): string[] {
    return this.jwtTokenService.getRoles();
  }

  logOut(): void {
    this.jwtTokenService.clean(true);
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
    const color = this.themeColorService.getThemeValue() === ThemeColor.dark ? ThemeColor.light : ThemeColor.dark;
    this.themeColorService.setTheme(color);
  }
}
