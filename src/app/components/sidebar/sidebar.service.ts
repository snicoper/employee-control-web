import { Injectable } from '@angular/core';
import { sidebarMenu } from './sidebar-menu';
import { SidebarMenu } from './sidebar-menu-types.model';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly sidebarMenus = sidebarMenu;
  private toggled = false;

  activeMenu(title: string): void {
    this.sidebarMenus.forEach((sidebarMenu: SidebarMenu) => {
      if (sidebarMenu.title === title) {
        sidebarMenu.active = !sidebarMenu.active;
      } else {
        sidebarMenu.active = false;
      }
    });
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }

  getSidebarState(): boolean {
    return this.toggled;
  }

  setSidebarState(state: boolean): void {
    this.toggled = state;
  }

  getMenuList(): SidebarMenu[] {
    return this.sidebarMenus;
  }
}
