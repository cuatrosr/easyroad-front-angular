import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';
import { selectNotifications } from 'src/app/core/store/selectors/notification.selectors';
import { Notification, NotificationState } from 'src/app/core/models/global.model';
import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NotificationService } from '../../services/notification-bell.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [ClickOutsideDirective, RouterLink, SocketIoModule, AngularSvgIconModule, NgIf, NgFor, BadgeModule],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss'],
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  notifications$ = this.store.select(selectNotifications);
  notifications: Notification[] = [];
  socketSubscription!: Subscription;
  socket = inject(Socket);
  isOpen = false;

  constructor(private notificationService: NotificationService, private store: Store<NotificationState>) {}

  ngOnInit() {
    this.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
    this.socketSubscription = this.socket.fromEvent<any>('alert').subscribe((alert) => {
      this.notificationService.addNotification({
        routerLink: `/administracion/ver_poste/${alert.serial_dispositivo}`,
        title: alert.serial_dispositivo,
        message: alert.tipo_evento,
      });
    });
  }

  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  dismissNotification(event: Event, index: number) {
    event.stopPropagation();
    this.notificationService.removeNotification(index);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative.ml-3')) {
      this.isOpen = false;
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.toggleMenu();
    }
  }
}
