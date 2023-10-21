import { Roles } from '@aw/core/types/roles';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { SidebarMenu, SidebarMenuTypes } from './sidebar.model';

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
        active: false
      },
      {
        title: 'Usuarios',
        link: SiteUrls.home,
        active: false,
        requiredRole: Roles.anonymous
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
        title: 'Cambiar contraseña',
        link: '/accounts/change-password',
        active: false
      }
    ]
  }
];
