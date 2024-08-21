import { AdministracionService } from '../../services/administracion.service';
import { ToastService } from 'src/app/core/services/toast-service.service';
import { Component, inject, ViewChild, Input } from '@angular/core';
import { Event } from 'src/app/core/models/global.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AngularSvgIconModule } from 'angular-svg-icon';
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
  selector: 'app-tabla-eventos',
  templateUrl: './tabla-eventos.component.html',
  styleUrl: './tabla-eventos.component.scss',
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
export class TablaEventosComponent {
  @ViewChild('dt1') dt1!: Table;
  @Input() events: Event[] = [];
  router = inject(Router);
  messageService = inject(MessageService);
  administracionService = inject(AdministracionService);
  loading: boolean = false;
  searchValue: string | undefined;
  selectedAction: any;

  clear(table: Table) {
    this.searchValue = '';
    table.clear();
    this.handleSuccess('Búsqueda limpiada');
  }

  handleSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message });
  }

  handleKeypress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.clear(this.dt1);
    }
  }
}
