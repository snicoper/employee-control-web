import { Injectable, inject } from '@angular/core';
import { LocalStorageKeys } from '@aw/core/types/local-storage-keys';
import { LocalStorageService } from '@aw/services/_index';
import { sidebarMenu } from './sidebar-menu-items';
import { SidebarMenu } from './sidebar.model';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly sidebarMenus: SidebarMenu[];
  private toggled = false;

  constructor() {
    const sidebarStorage = this.loadFromLocalStorage();
    this.sidebarMenus = sidebarStorage ?? sidebarMenu;
  }

  activeMenu(title: string): void {
    this.sidebarMenus.forEach((sidebarMenu: SidebarMenu) => {
      if (sidebarMenu.title === title) {
        sidebarMenu.active = !sidebarMenu.active;
      } else {
        sidebarMenu.active = false;
      }
    });

    this.saveToLocalStorage();
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

  private loadFromLocalStorage(): SidebarMenu[] {
    return this.localStorageService.getParse(LocalStorageKeys.sidebar);
  }

  // TODO: Eliminar guardar datos de sidebar en localStorage?
  private saveToLocalStorage(): void {
    // this.localStorageService.setObject(LocalStorageKeys.sidebar, this.sidebarMenus);
  }
}
