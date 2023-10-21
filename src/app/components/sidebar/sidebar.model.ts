export enum SidebarMenuTypes {
  header = 'header',
  simple = 'simple',
  dropdown = 'dropdown'
}

export type SidebarMenu = {
  title: string;
  icon: string;
  active: boolean;
  type: SidebarMenuTypes;
  link?: string;

  badge?: {
    text: string;
    class: string;
  };

  submenus: Array<{
    title: string;
    link: string;
    active: boolean;

    badge?: {
      text: string;
      class: string;
    };
  }>;
};
