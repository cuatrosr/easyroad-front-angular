import { AdministracionService } from '../../services/administracion.service';
import { Component, inject, ViewChild, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast-service.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tabla-alertas',
  templateUrl: './tabla-alertas.component.html',
  styleUrl: './tabla-alertas.component.scss',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    MultiSelectModule,
    SplitButtonModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ToastModule,
    TableModule,
    NgFor,
  ],
  providers: [ToastService, AdministracionService],
})
export class TablaAlertasComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  @Input() alerts: any[] = [];
  projectId: string = '';
  router = inject(Router);
  route = inject(ActivatedRoute);
  messageService = inject(MessageService);
  administracionService = inject(AdministracionService);
  loading: boolean = false;
  searchValue: string | undefined;
  selectedAction: any;

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
  }

  clear(table: Table) {
    this.searchValue = '';
    table.clear();
    this.handleSuccess('Filtros despejados');
  }

  handleSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Mensaje', detail: message });
  }

  handleKeypress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.clear(this.dt1);
    }
  }
}
