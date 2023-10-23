import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, computed, inject } from '@angular/core';
import { JwtService, LayoutService } from '@aw/services/_index';
import { CompanyEmployeeStore } from './../../services/storage/company-employee.store';
import { SidebarMenu, SidebarMenuTypes } from './sidebar-menu-types.model';
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
  private readonly companyEmployeeStore = inject(CompanyEmployeeStore);

  readonly sidebarState$ = computed(() => this.layoutService.sidebarState$());

  readonly sidebarMenus: SidebarMenu[];
  readonly sidebarMenuTypes = SidebarMenuTypes;

  constructor() {
    this.sidebarMenus = this.sidebarService.getMenuList();
  }

  get username(): string {
    return this.jwtService.getName();
  }

  get companyName(): string {
    return this.companyEmployeeStore.getValue()?.name as string;
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
