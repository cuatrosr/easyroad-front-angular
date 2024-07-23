import { TablaEventosComponent } from '../../components/tabla-eventos/tabla-eventos.component';
import { TablaAlertasComponent } from '../../components/tabla-alertas/tabla-alertas.component';
import { TablaPostesComponent } from '../../components/tabla-postes/tabla-postes.component';
import { BreadcrumbService } from 'src/app/modules/layout/services/breadcrumb.service';
import { GridCardComponent } from '../../components/grid-card/grid-card.component';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { AdministracionService } from '../../services/administracion.service';
import { Event, Project } from 'src/app/core/models/global.model';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-administracion-proyectos',
  standalone: true,
  templateUrl: './ver-proyecto.component.html',
  styleUrl: './ver-proyecto.component.scss',
  imports: [
    CommonModule,
    LogoComponent,
    GridCardComponent,
    TablaPostesComponent,
    TablaEventosComponent,
    TablaAlertasComponent,
  ],
  providers: [MessageService, AdministracionService, HttpClientModule],
})
export class VerProyectoComponent implements OnInit {
  administracionService = inject(AdministracionService);
  messageService = inject(MessageService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  loading: boolean = false;
  project: Project = {} as Project;
  poles: any[] = [];
  events: Event[] = [];
  alerts: Event[] = [];
  projectId: string = '';
  alertCount: number = 0;
  workingCount: number = 0;
  disconnectedCount: number = 0;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.getProject();
    this.breadcrumbService.setHomeBreadcrumb({
      icon: 'pi pi-cog',
      routerLink: '/administracion/proyectos',
    });
  }

  getProject() {
    this.administracionService.getProjectById(this.projectId).subscribe({
      next: (data: Project) => {
        this.project = data;
        this.breadcrumbService.setBreadcrumbs([
          { label: 'Gestion de Proyectos', icon: 'pi pi-chart-line', routerLink: '/administracion/proyectos' },
          {
            label: this.project.name,
            icon: 'pi pi-file-check',
            routerLink: `/administracion/ver_proyecto/${this.projectId}`,
          },
        ]);
        this.getPoles();
      },
      error: (error: any) => {
        this.handleError(error);
        this.loading = false;
      },
    });
  }

  getAlertCount() {
    this.alertCount = this.poles.filter((pole) => pole.state === 'alert').length;
  }

  getWorkingCount() {
    this.workingCount = this.poles.filter((pole) => pole.state === 'ok').length;
  }

  getDisconnectedCount() {
    this.disconnectedCount = this.poles.filter((pole) => pole.state === 'disconnected').length;
  }

  getPoles() {
    this.administracionService.getPoles(this.projectId).subscribe({
      next: (data) => {
        this.poles = data;
        this.getAlertCount();
        this.getWorkingCount();
        this.getDisconnectedCount();
        this.getEvents();
      },
      error: (error) => {
        this.handleError(error);
        this.loading = false;
      },
    });
  }

  getEvents() {
    this.administracionService.getEvents(this.poles).subscribe({
      next: (data: Event[]) => {
        this.events = data;
        this.loading = false;
        this.getAlerts();
      },
      error: (error) => {
        this.handleError(error);
        this.loading = false;
      },
    });
  }

  getAlerts() {
    this.administracionService.getAlerts(this.poles).subscribe({
      next: (data: Event[]) => {
        this.alerts = data;
        this.loading = false;
      },
      error: (error) => {
        this.handleError(error);
        this.loading = false;
      },
    });
  }

  handleError(error: { message: string }) {
    const errorMessage = error?.message || 'Error desconocido';
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
  }
}
