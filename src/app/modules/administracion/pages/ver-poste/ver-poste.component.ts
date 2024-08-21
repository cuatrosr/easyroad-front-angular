import { BreadcrumbComponent } from 'src/app/modules/layout/components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from 'src/app/modules/layout/services/breadcrumb.service';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { AdministracionService } from '../../services/administracion.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgIf } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-administracion-postes',
  standalone: true,
  templateUrl: './ver-poste.component.html',
  styleUrl: './ver-poste.component.scss',
  imports: [LogoComponent, NgIf, SocketIoModule, BreadcrumbComponent, ButtonModule, ToastModule, CommonModule],
  providers: [MessageService, AdministracionService],
})
export class VerPosteComponent implements OnInit, OnDestroy {
  administracionService = inject(AdministracionService);
  messageService = inject(MessageService);
  socketSubscription!: Subscription;
  route = inject(ActivatedRoute);
  socket = inject(Socket);
  router = inject(Router);
  loading: boolean = false;
  poleSerial: string = '';
  projectId: string = '';
  project: any = {};
  heartbeat: any = {};
  pole: any = {};
  intervalId: any;
  accionEnviada: string | null = null;
  botonesDeshabilitados: boolean = false;
  respuestaServidor: string | null = null;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    this.poleSerial = this.route.snapshot.paramMap.get('serial')!;
    this.loading = true;
    this.handleSocketConnection();
    this.getProject();
    this.breadcrumbService.setHomeBreadcrumb({
      icon: 'pi pi-cog',
      routerLink: '/administracion/gestion-proyectos',
    });
    this.socket.on('respuesta_solicitud', (data: any) => {
      this.respuestaServidor = data.mensaje; 
    });
  }

  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  getProject() {
    this.administracionService.getProjectById(this.projectId).subscribe({
      next: (data) => {
        this.project = data;
        this.getPole();
      },
      error: (error) => {
        this.handleError(error);
        this.loading = false;
      },
    });
  }

  getPole() {
    this.administracionService.getPoleBySerial(this.poleSerial).subscribe({
      next: (data) => {
        this.pole = data;
        this.getHeartbeat();
        this.breadcrumbService.setBreadcrumbs([
          { label: 'Gestion de Proyectos', icon: 'pi pi-chart-line', routerLink: '/administracion/gestion-proyectos' },
          {
            label: this.project.name,
            icon: 'pi pi-file-check',
            routerLink: `/administracion/gestion-proyectos/ver_proyecto/${this.projectId}`,
          },
          {
            label: 'Detalles Poste',
            icon: 'pi pi-caret-down',
          },
        ]);
      },
      error: (error) => {
        this.handleError(error);
        this.loading = false;
      },
    });
  }

  getHeartbeat() {
    this.administracionService.getHeartbeat(this.poleSerial).subscribe({
      next: (data) => {
        this.heartbeat = data;
        this.loading = false;
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  handleResolve() {
    this.administracionService.handleAlertPole(this.pole._id).subscribe();
    window.location.reload();
  }

  handleSolicitud(text: string) {
    this.botonesDeshabilitados = true;
    this.socket.emit('solicitud', {
      uuid_solicitud: uuidv4(),
      tipo_solicitud: text,
      valor_solicitud: '1',
      serial_dispositivo: this.poleSerial,
    });
    this.accionEjecutada(text);
    setTimeout(() => {
      this.botonesDeshabilitados = false;
      this.accionEnviada = null;
    }, 15000);
  }

  handleInfo(message: string): void {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

  accionEjecutada(accion: string){
    this.accionEnviada = accion ;
  }

  handleSocketConnection() {
    this.socket.emit('serial', `${this.poleSerial}`);
    this.socketSubscription = this.socket.fromEvent<any>(`${this.poleSerial}`).subscribe((newHeartbeat) => {
      this.heartbeat = newHeartbeat;
    });
  }

  handleError(error: { message: string }) {
    const errorMessage = error?.message || 'Error desconocido';
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
  }
}
