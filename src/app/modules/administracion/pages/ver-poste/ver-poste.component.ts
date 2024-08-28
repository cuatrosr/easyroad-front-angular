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
import { NgIf, NgSwitchCase } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { interval, BehaviorSubject, map } from 'rxjs';
import { Event } from 'src/app/core/models/global.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-administracion-postes',
  standalone: true,
  templateUrl: './ver-poste.component.html',
  styleUrl: './ver-poste.component.scss',
  imports: [LogoComponent, NgIf, SocketIoModule, BreadcrumbComponent, ButtonModule, ToastModule, CommonModule, ProgressSpinnerModule, NgSwitchCase, ConfirmDialogModule],
  providers: [MessageService, AdministracionService, ConfirmationService],
})
export class VerPosteComponent implements OnInit, OnDestroy {
  administracionService = inject(AdministracionService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  socketSubscription!: Subscription;
  route = inject(ActivatedRoute);
  socket = inject(Socket);
  router = inject(Router);
  loading: boolean = false;
  poleSerial: string = '';
  heartbeat: any = {};
  pole: any = {};
  intervalId: any;
  noData: any;
  accionEnviada: string | null = null;
  botonesDeshabilitados: boolean = false;
  mostrarSpinner: boolean = false;  // Variable para mostrar el spinner
  events: any[] = [];
  conexionPoste: string = "disconnected";
  private eventsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private pollingInterval$: Subscription = new Subscription();
  private lastEvent: Event | null = null; // Para almacenar el último evento

  constructor(private breadcrumbService: BreadcrumbService) { }

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

    if (this.pollingInterval$) {
      this.pollingInterval$.unsubscribe();
    }
  }

  getPole() {
    this.administracionService.getPoleBySerial(this.poleSerial).subscribe({
      next: (data) => {
        this.pole = data;
        this.getHeartbeat();
        this.breadcrumbService.setBreadcrumbs([
          { label: 'Gestion de Proyectos', icon: 'pi pi-chart-line', routerLink: `gestion-proyectos/ver_proyecto/${this.pole.project}` },
          {
            label: 'Detalles Poste',
            icon: 'pi pi-file-check',
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
    const solicitudPayload = {
      uuid_solicitud: uuidv4(),
      tipo_solicitud: text,
      valor_solicitud: '1',
      serial_dispositivo: this.poleSerial,
    };
    if (text === 'llamada_prueba') {
      this.startPolling();
      this.botonesDeshabilitados = true;
      this.mostrarSpinner = true;
      this.socket.emit('solicitud', solicitudPayload);
      this.accionEjecutada(text);
    } else if (text === 'reinicio_dispositivo' || text === 'reinicio_modem') {
      this.estadoPostePolling();
      this.socket.emit('solicitud', solicitudPayload);
      this.accionEjecutada(text);
      this.botonesDeshabilitados = true;
      this.mostrarSpinner = true;
      setTimeout(() => {
        this.botonesDeshabilitados = false;
        this.mostrarSpinner = false;
        this.accionEnviada = null;
      }, 40000)
    }
  }

  handleInfo(message: string): void {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

  accionEjecutada(accion: string) {
    this.accionEnviada = accion.replace('_', " ");
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

  startPolling() {
    this.pollingInterval$ = interval(10000).subscribe(() => {
      this.getEstadoPoste();
    });
  }

  estadoPostePolling() {
    this.pollingInterval$ = interval(10000).subscribe(() => {
      this.getPole();
      this.conexionPoste = this.pole.state;
    });
  }

  stopPolling() {
    if (this.pollingInterval$) {
      this.pollingInterval$.unsubscribe();
    }
  }

  checkEstadoEvento() {
    if (!this.events.length) {
      return;
    }

    this.lastEvent = this.events
      .sort((a: Event, b: Event) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0];

    if (this.lastEvent?.estado_evento === 'OCUPADO') {
      this.botonesDeshabilitados = true;
      this.mostrarSpinner = true;
      this.waitForFinalizo();
    } else {
      this.botonesDeshabilitados = false;
      this.mostrarSpinner = false;
    }
  }

  waitForFinalizo() {
    this.eventsSubject.asObservable().pipe(
      map(events => {
        const sortedEvents = events.sort((a: Event, b: Event) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        const lastFinalizoEvent = sortedEvents.find(event => event.estado_evento === 'FINALIZO');
        const lastOcupadoEvent = sortedEvents.find(event => event.estado_evento === 'OCUPADO');

        if (lastFinalizoEvent && lastOcupadoEvent) {
          return new Date(lastFinalizoEvent.fecha).getTime() > new Date(lastOcupadoEvent.fecha).getTime();
        }
        return false;
      })
    ).subscribe(finalizo => {
      if (finalizo) {
        this.botonesDeshabilitados = false;
        this.accionEnviada = '';
        this.stopPolling();
      }
    });
  }

  getEstadoPoste() {
    this.administracionService.getEvents([{ serial: `${this.poleSerial}` }]).subscribe(events => {
      this.events = events;
      this.eventsSubject.next(events);
      this.checkEstadoEvento();
    });
  }

  accionesEvent(event: MouseEvent,text: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro de realizar esta accion?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-text p-button-text bg-[#e10a17] text-white px-4 py-1',
      acceptButtonStyleClass: 'p-button-danger p-button-text mx-4 bg-[#e10a17] text-white px-4 py-1',
      accept: () => {
        this.handleSolicitud(text);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Atencion', detail: 'Accion no realizada', life: 3000 });
      }
    });
  }
}
