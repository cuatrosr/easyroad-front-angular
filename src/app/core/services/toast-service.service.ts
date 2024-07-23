import { Injectable, inject } from '@angular/core';
import { Toast } from '../models/global.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService = inject(MessageService);
  showToast({ titulo, mensaje, tipo }: Toast) {
    this.messageService.add({
      key: 'br',
      severity: tipo,
      summary: titulo,
      detail: mensaje,
    });
  }
}
