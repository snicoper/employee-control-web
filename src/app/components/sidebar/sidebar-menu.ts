import { Roles } from '@aw/core/types/roles';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { SidebarMenu, SidebarMenuTypes } from './sidebar-menu-types.model';

export const sidebarMenu: SidebarMenu[] = [
  {
    title: 'Administración',
    icon: 'fas fa-user-shield',
    active: false,
    type: SidebarMenuTypes.dropdown,
    requiredRole: Roles.administrator,
    submenus: [
      {
        title: 'Panel',
        link: SiteUrls.dashboard.dashboard,
        icon: 'fas fa-user-shield',
        active: false
      },
      {
        title: 'Tests',
        link: SiteUrls.tests.homeTests,
        active: false
      }
    ]
  },
  {
    title: 'Administrar',
    icon: 'fas fa-user',
    active: false,
    type: SidebarMenuTypes.dropdown,
    submenus: [
      {
        title: 'Empleados',
        link: SiteUrls.employees.employeeList,
        active: false
      },
      {
        title: 'Invitar empleado',
        link: SiteUrls.employees.inviteEmployee,
        active: false
      }
    ]
  }
];
