import { Injectable } from '@angular/core';
import { sidebarMenu } from './sidebar-menu';
import { SidebarMenu } from './sidebar-menu-types.model';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly sidebarMenu = sidebarMenu;

  activeMenu(title: string): void {
    this.sidebarMenu.forEach((sidebarMenu: SidebarMenu) => {
      if (sidebarMenu.title === title) {
        sidebarMenu.active = !sidebarMenu.active;
      } else {
        sidebarMenu.active = false;
      }
    });
  }

  getMenuList(): SidebarMenu[] {
    return this.sidebarMenu;
  }
}
