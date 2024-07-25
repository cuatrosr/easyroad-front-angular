import { addNotification, removeNotification } from '../actions/notification.actions';
import { NotificationState } from 'src/app/core/models/global.model';
import { createReducer, on } from '@ngrx/store';

export const initialState: NotificationState = {
  notifications: [],
};

export const notificationReducer = createReducer(
  initialState,
  on(addNotification, (state, { notification }) => ({
    ...state,
    notifications: [...state.notifications, notification],
  })),
  on(removeNotification, (state, { index }) => {
    const updatedNotifications = state.notifications.filter((_, i) => i !== index);
    return {
      ...state,
      notifications: updatedNotifications,
    };
  }),
);
