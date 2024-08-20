import { AdministracionService } from '../../services/administracion.service';
import { ToastService } from 'src/app/core/services/toast-service.service';
import { Component, inject, ViewChild, Input } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Pole } from 'src/app/core/models/global.model';
import { TableModule, Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
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
    NgFor,
    FormsModule,
    DropdownModule,
    SplitButtonModule,
    ToastModule,
    TableModule,
    AngularSvgIconModule,
    ButtonModule,
    MultiSelectModule,
    DialogModule,
  ],
  providers: [ToastService, AdministracionService],
})
export class TablaPostesComponent {
  @ViewChild('dt1') dt1!: Table;
  @Input() poles: any[] = [];
  @Input() projectId: string = '';
  items = [
    { label: 'Ver', value: 'ver' },
    { label: 'Eliminar', value: 'eliminar' },
  ];
  router = inject(Router);
  messageService = inject(MessageService);
  administracionService = inject(AdministracionService);
  loading: boolean = false;
  searchValue: string | undefined;
  poleSerial!: string;
  selectedAction: any;

  clear(table: Table) {
    this.searchValue = '';
    table.clear();
  }

  handleKeypress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.clear(this.dt1);
    }
  }

  handleDelete(id: number): void {
    this.administracionService.deletePole(id).subscribe({
      next: () => {
        this.handleSuccess('Poste eliminado correctamente');
      },
      error: (error: any) => {
        this.handleError(error);
      },
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
      this.datosPoste('administracion/ver_poste', this.poleSerial);
    } else if (action === 'eliminar') {
      this.handleDelete(pole._id);
    }
  }
}
