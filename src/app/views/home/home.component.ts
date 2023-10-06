import { Component, inject } from '@angular/core';
import { ThemeColors } from '@aw/core/types/_index';
import { ApiUrls } from '@aw/core/utils/api-urls';
import { JwtService, LayoutService, ThemeColorService } from '@aw/services/_index';
import { AuthApiService } from '@aw/services/api/_index';

@Component({
  selector: 'aw-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  layoutService = inject(LayoutService);
  private jwtService = inject(JwtService);
  private themeColorService = inject(ThemeColorService);
  private authApiService = inject(AuthApiService);

  constructor() {
    this.authApiService.get(ApiUrls.currentLocale).subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error)
    });
  }

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
