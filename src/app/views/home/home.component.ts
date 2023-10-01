import { Component } from '@angular/core';
import { ThemeColor } from '../../core/constants/_index';
import { JwtTokenService, LayoutService, ThemeColorService } from '../../services/_index';

@Component({
  selector: 'aw-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(
    private layoutService: LayoutService,
    private jwtTokenService: JwtTokenService,
    private themeColorService: ThemeColorService
  ) {}

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
    this.layoutService.toggleNavbar();
  }

  handleToggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  handleToggleFooter(): void {
    this.layoutService.toggleFooter();
  }

  handleChangeThemeColor(): void {
    const color = this.themeColorService.themeValue === ThemeColor.dark ? ThemeColor.light : ThemeColor.dark;
    this.themeColorService.setTheme(color);
  }
}
