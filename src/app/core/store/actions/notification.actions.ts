import { createAction, props } from '@ngrx/store';
import { Notification } from 'src/app/core/models/global.model';

export const addNotification = createAction('[Notification] Add Notification', props<{ notification: Notification }>());

export const removeNotification = createAction('[Notification] Remove Notification', props<{ index: number }>());
