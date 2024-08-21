import { AdministracionService } from '../../services/administracion.service';
import { ToastService } from 'src/app/core/services/toast-service.service';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Project } from 'src/app/core/models/global.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableModule, Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-tabla-proyectos',
  templateUrl: './tabla-proyectos.component.html',
  styleUrl: './tabla-proyectos.component.scss',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    ConfirmDialogModule,
    SplitButtonModule,
    MultiSelectModule,
    DropdownModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    TableModule,
    NgFor,
  ],
  providers: [ToastService, AdministracionService],
})
export class TablaProyectosComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  projects: Project[] = [];
  items = [
    { label: 'Ver', value: 'ver' },
    { label: 'Eliminar', value: 'eliminar' },
  ];
  router = inject(Router);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  administracionService = inject(AdministracionService);
  loading: boolean = false;
  searchValue: string | undefined;
  projectId!: number;
  selectedAction: any;

  ngOnInit(): void {
    this.loading = true;
    this.getProjects();
  }

  clear(table: Table) {
    this.searchValue = '';
    table.clear();
    this.handleSuccess('Búsqueda limpiada');
  }

  handleKeypress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.clear(this.dt1);
    }
  }

  getProjects() {
    this.administracionService.getProjects().subscribe({
      next: (data: Project[]) => {
        this.projects = data;
        this.loading = false;
      },
      error: (error) => {
        this.handleError(error);
        this.loading = false;
      },
    });
  }

  handleDelete(id: number): void {
    this.confirmationService.confirm({
      header: '¿Está seguro de que desea eliminar este proyecto?',
      message: 'Una vez eliminado, no podrá acceder al proyecto nuevamente.',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.administracionService.deleteProject(id).subscribe({
          next: () => {
            this.getProjects();
            this.handleSuccess('Proyecto eliminado correctamente');
          },
          error: (error: any) => {
            this.handleError(error);
          },
        });
      },
      reject: () => {},
    });
  }

  handleSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message });
  }

  handleError(error: { message: string }) {
    let errorMessage = error?.message || 'Error desconocido';
    if (errorMessage.startsWith('Http failure response for')) errorMessage = 'No se pudo conectar con el servidor';
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
  }

  datosProyecto(pagina: string, id: number) {
    this.router.navigate([pagina, id]);
  }

  redirigirPagina(pagina: string) {
    this.router.navigate([pagina]);
  }

  onActionClick(project: { _id: number }, action: string) {
    this.projectId = project._id;
    if (action === 'ver') {
      this.datosProyecto('/administracion/gestion-proyectos/ver_proyecto', this.projectId);
    } else if (action === 'eliminar') {
      this.selectedAction = null;
      this.handleDelete(this.projectId);
    }
  }
}
