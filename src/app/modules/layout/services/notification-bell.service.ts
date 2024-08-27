import { addNotification, removeNotification } from 'src/app/core/store/actions/notification.actions';
import { selectNotifications } from 'src/app/core/store/selectors/notification.selectors';
import { Notification, NotificationState } from 'src/app/core/models/global.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

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

  removeAllBySerial(serial: string) {
    this.store
      .select(selectNotifications)
      .pipe(take(1))
      .subscribe((notifications: Notification[]) => {
        const indicesToRemove = notifications
          .map((notification, index) => ({ notification, index }))
          .filter(({ notification }) => notification.title === serial)
          .map(({ index }) => index);

        indicesToRemove.reverse().forEach((index) => {
          this.removeNotification(index);
        });
      });
  }
}
