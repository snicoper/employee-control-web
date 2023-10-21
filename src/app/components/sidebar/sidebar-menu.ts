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
        link: SiteUrls.dashboard,
        icon: 'fas fa-user-shield',
        active: false
      },
      {
        title: 'Tests',
        link: SiteUrls.homeTests,
        active: false
      }
    ]
  },
  {
    title: 'Usuario',
    icon: 'fas fa-user',
    active: false,
    type: SidebarMenuTypes.dropdown,
    submenus: [
      {
        title: 'Perfil',
        link: '/accounts/profile',
        active: false
      },
      {
        title: 'Cerrar sesión',
        link: SiteUrls.logout,
        active: false
      }
    ]
  }
];
