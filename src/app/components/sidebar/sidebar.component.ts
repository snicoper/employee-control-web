import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, computed, inject } from '@angular/core';
import { TimeState } from '@aw/models/entities/types/time-state.model';
import { JwtService, LayoutService } from '@aw/services/_index';
import { CurrentCompanyEmployeeService, CurrentTimeControlStateService } from '@aw/services/states/_index';
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
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);
  private readonly currentTimeControlStateService = inject(CurrentTimeControlStateService);

  readonly sidebarState$ = computed(() => this.layoutService.sidebarState$());
  readonly currentTimeControl = computed(() => this.currentTimeControlStateService.currentTimeControl());
  readonly loadingCurrentTimeControl = computed(() => this.currentTimeControlStateService.loadingCurrentTimeControl());

  readonly sidebarMenus: SidebarMenu[];
  readonly sidebarMenuTypes = SidebarMenuTypes;
  readonly timeStates = TimeState;

  constructor() {
    this.sidebarMenus = this.sidebarService.getMenuList();
  }

  get username(): string {
    return this.jwtService.getName();
  }

  get companyName(): string {
    return this.currentCompanyEmployeeService.getValue()?.name as string;
  }

  toggle(currentMenu: SidebarMenu): void {
    if (currentMenu.type === this.sidebarMenuTypes.dropdown) {
      this.sidebarService.activeMenu(currentMenu.title);
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
