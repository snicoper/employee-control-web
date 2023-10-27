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
    title: 'Empresa',
    icon: 'fa-regular fa-building',
    active: false,
    type: SidebarMenuTypes.dropdown,
    submenus: [
      {
        title: 'Empleados',
        link: SiteUrls.employees.employeeList,
        active: false
      },
      {
        title: 'Tareas',
        link: SiteUrls.companyTasks.companyTaskList,
        active: false
      }
    ]
  },
  {
    title: 'Desconectar',
    icon: 'fa-solid fa-right-from-bracket',
    active: false,
    type: SidebarMenuTypes.simple,
    link: SiteUrls.auth.logout
  }
];
