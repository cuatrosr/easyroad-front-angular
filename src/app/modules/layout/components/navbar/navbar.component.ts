import { NotificationBellComponent } from '../notification-bell/notification-bell.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobilecomponent';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarMenuComponent,
    BreadcrumbComponent,
    ProfileMenuComponent,
    AngularSvgIconModule,
    NavbarMobileComponent,
    NotificationBellComponent,
  ],
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '';

  constructor(private menuService: MenuService, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }

  shouldShowCard(): boolean {
    return !(this.currentRoute === '/paginas/inicio' || this.currentRoute === '/paginas/proyectos');
  }
}
