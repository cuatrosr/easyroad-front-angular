import { BreadcrumbService } from '../../services/breadcrumb.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  imports: [BreadcrumbModule, NgClass],
})
export class BreadcrumbComponent implements OnInit {
  home: MenuItem | undefined;
  items: MenuItem[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.homeBreadcrumb$.subscribe({
      next: (homeBreadcrumb) => {
        if (homeBreadcrumb) {
          this.home = {
            icon: homeBreadcrumb.icon,
            routerLink: homeBreadcrumb.routerLink,
          };
        }
      },
    });
    this.breadcrumbService.breadcrumbs$.subscribe({
      next: (breadcrumbs) => {
        this.items = breadcrumbs.map((breadcrumb) => ({
          label: breadcrumb.label,
          icon: breadcrumb.icon,
          routerLink: breadcrumb.routerLink,
        }));
      },
    });
  }
}
