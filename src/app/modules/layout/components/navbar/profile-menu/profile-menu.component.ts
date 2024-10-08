import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToastService } from 'src/app/core/services/toast-service.service';
import { ThemeService } from '../../../../../core/services/theme.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [
    ClickOutsideDirective,
    NgClass,
    RouterLink,
    AngularSvgIconModule,
    ButtonModule,
    ToastModule,
    CommonModule,
    AvatarModule,
  ],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
  providers: [ToastService],
})
export class ProfileMenuComponent implements OnInit {
  user!: any | null;
  public isOpen = false;
  public profileMenu = [
    {
      title: 'Tu perfil',
      icon: './assets/icons/heroicons/outline/user-circle.svg',
      link: '/profile',
    },
    {
      title: 'Configuracion',
      icon: './assets/icons/heroicons/outline/cog-6-tooth.svg',
      link: '/settings',
    },
  ];

  public themeColors = [
    {
      name: 'base',
      code: '#e11d48',
    },
    {
      name: 'yellow',
      code: '#f59e0b',
    },
    {
      name: 'green',
      code: '#22c55e',
    },
    {
      name: 'blue',
      code: '#3b82f6',
    },
    {
      name: 'orange',
      code: '#ea580c',
    },
    {
      name: 'red',
      code: '#cc0022',
    },
    {
      name: 'violet',
      code: '#6d28d9',
    },
  ];

  public themeMode = ['Claro', 'Oscuro'];
  loading: boolean = false;
  nombreUsuario: string = '';

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  toggleThemeMode() {
    this.themeService.theme.update((theme) => {
      const mode = !this.themeService.isDark ? 'dark' : 'light';
      return { ...theme, mode: mode };
    });
  }

  toggleThemeColor(color: string) {
    this.themeService.theme.update((theme) => {
      return { ...theme, color: color };
    });
  }
}
