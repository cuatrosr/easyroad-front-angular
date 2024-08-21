import { Component, inject, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { AdministracionService } from '../../services/administracion.service';
import { ToastService } from 'src/app/core/services/toast-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Pole } from 'src/app/core/models/global.model';
import { TableModule, Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tabla-postes',
  templateUrl: './tabla-postes.component.html',
  styleUrl: './tabla-postes.component.scss',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    ConfirmDialogModule,
    MultiSelectModule,
    SplitButtonModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    TableModule,
    FormsModule,
    NgFor,
  ],
  providers: [ToastService, AdministracionService],
})
export class TablaPostesComponent {
  @Output() refreshPoles = new EventEmitter<void>();
  @ViewChild('dt1') dt1!: Table;
  @Input() poles: any[] = [];
  @Input() projectId: string = '';
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
  poleSerial!: string;
  selectedAction: any;

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

  triggerRefreshPoles() {
    this.refreshPoles.emit();
  }

  handleDelete(id: number): void {
    this.confirmationService.confirm({
      header: '¿Está seguro de que desea eliminar este poste?',
      message: 'Una vez eliminado, no podrá acceder al poste nuevamente.',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.administracionService.deletePole(id).subscribe({
          next: () => {
            this.triggerRefreshPoles();
            this.handleSuccess('Poste eliminado correctamente');
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
    const errorMessage = error?.message || 'Error desconocido';
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
  }

  datosPoste(pagina: string, id: string) {
    this.router.navigate([pagina, id]);
  }

  redirigirPagina(pagina: string) {
    this.router.navigate([pagina]);
  }

  onActionClick(pole: Pole, action: string) {
    this.poleSerial = pole.serial;
    if (action === 'ver') {
      this.datosPoste(`administracion/gestion-proyectos/ver_proyecto/${this.projectId}/ver_poste`, this.poleSerial);
    } else if (action === 'eliminar') {
      this.selectedAction = null;
      this.handleDelete(pole._id);
    }
  }
}
