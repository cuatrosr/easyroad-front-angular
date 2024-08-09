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

@Component({
  selector: 'app-administracion-postes',
  standalone: true,
  templateUrl: './ver-poste.component.html',
  styleUrl: './ver-poste.component.scss',
  imports: [LogoComponent, NgIf, SocketIoModule, BreadcrumbComponent, ButtonModule, ToastModule],
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
  heartbeat: any = {};
  pole: any = {};
  intervalId: any;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.poleSerial = this.route.snapshot.paramMap.get('serial')!;
    this.loading = true;
    this.handleSocketConnection();
    this.getPole();
    this.breadcrumbService.setHomeBreadcrumb({
      icon: 'pi pi-cog',
      routerLink: '/administracion/proyectos',
    });
  }

  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  getPole() {
    this.administracionService.getPoleBySerial(this.poleSerial).subscribe({
      next: (data) => {
        this.pole = data;
        this.getHeartbeat();
        this.breadcrumbService.setBreadcrumbs([
          { label: 'Gestion de Proyectos', icon: 'pi pi-chart-line', routerLink: '/administracion/proyectos' },
          {
            label: 'Detalles Poste',
            icon: 'pi pi-file-check',
            routerLink: `/administracion/ver_poste/${this.poleSerial}`,
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
    this.socket.emit('solicitud', {
      uuid_solicitud: uuidv4(),
      tipo_solicitud: text,
      valor_solicitud: '1',
      serial_dispositivo: this.poleSerial,
    });
    this.handleInfo(`Solicitud de ${text} enviada.`);
  }

  handleInfo(message: string): void {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
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
