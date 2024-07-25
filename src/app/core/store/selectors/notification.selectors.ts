import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState } from '../../models/global.model';

export const selectNotificationState = createFeatureSelector<NotificationState>('notifications');

export const selectNotifications = createSelector(
  selectNotificationState,
  (state: NotificationState) => state.notifications,
);
