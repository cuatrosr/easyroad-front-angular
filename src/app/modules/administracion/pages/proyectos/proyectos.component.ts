import { BreadcrumbComponent } from 'src/app/modules/layout/components/breadcrumb/breadcrumb.component';
import { TablaProyectosComponent } from '../../components/tabla-proyectos/tabla-proyectos.component';
import { BreadcrumbService } from 'src/app/modules/layout/services/breadcrumb.service';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-administracion-proyectos',
  standalone: true,
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss',
  imports: [LogoComponent, ToastModule, ConfirmDialogModule, BreadcrumbComponent, TablaProyectosComponent],
  providers: [MessageService, ConfirmationService],
})
export class ProyectosComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.setHomeBreadcrumb({
      icon: 'pi pi-cog',
      routerLink: '/administracion/proyectos',
    });
    this.breadcrumbService.setBreadcrumbs([
      { label: 'Gestion de Proyectos', icon: 'pi pi-chart-line', routerLink: '/administracion/proyectos' },
    ]);
  }
}
