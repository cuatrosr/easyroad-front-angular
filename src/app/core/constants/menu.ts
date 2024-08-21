import { MenuItem } from '../models/menu.model';

export class Menu {
  public static readonly pages: MenuItem[] = [
    {
      group: '',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/home.svg',
          label: 'Inicio',
          route: '/paginas/inicio',
        },
      ],
    },
    {
      group: '',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/presentation-chart-bar.svg',
          label: 'Proyectos',
          route: '/paginas/proyectos',
        },
      ],
    },
    {
      group: '',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/admin-gear.svg',
          label: 'Administracion',
          route: '/administracion',
          children: [{ label: 'Gestión de Proyectos', route: '/administracion/gestion-proyectos' }],
        },
      ],
    },
  ];
}
