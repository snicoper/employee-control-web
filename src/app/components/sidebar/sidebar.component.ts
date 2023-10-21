import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, computed, inject } from '@angular/core';
import { SiteUrls } from '@aw/core/urls/_index';
import { JwtService, LayoutService } from '@aw/services/_index';
import { SidebarMenu, SidebarMenuTypes } from './sidebar.model';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'aw-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent {
  private readonly jwtService = inject(JwtService);
  private readonly layoutService = inject(LayoutService);
  private readonly sidebarService = inject(SidebarService);

  readonly sidebarState$ = computed(() => this.layoutService.sidebarState$());

  readonly sidebarMenus: SidebarMenu[];
  readonly sidebarMenuTypes = SidebarMenuTypes;
  readonly siteUrls = SiteUrls;

  constructor() {
    this.sidebarMenus = this.sidebarService.getMenuList();
  }

  getUsername(): string {
    return this.jwtService.getName();
  }

  toggle(currentMenu: SidebarMenu): void {
    if (currentMenu.type === this.sidebarMenuTypes.dropdown) {
      this.sidebarMenus.forEach((sidebarMenu: SidebarMenu) => {
        if (sidebarMenu === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          sidebarMenu.active = false;
        }

        this.sidebarService.activeMenu(currentMenu.title);
      });
    }
  }

  getState(currentMenu: SidebarMenu): string {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }
}
