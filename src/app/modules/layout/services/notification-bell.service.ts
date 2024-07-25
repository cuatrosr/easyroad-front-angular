import { addNotification, removeNotification } from 'src/app/core/store/actions/notification.actions';
import { Notification, NotificationState } from 'src/app/core/models/global.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private store: Store<NotificationState>) {}

  addNotification(notification: Notification) {
    this.store.dispatch(addNotification({ notification }));
  }

  removeNotification(index: number) {
    this.store.dispatch(removeNotification({ index }));
  }
}
