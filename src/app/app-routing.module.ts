import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from 'src/environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { notificationReducer } from './core/store/reducer/notification.reducer';
import { NotificationState } from './core/models/global.model';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'paginas',
    loadChildren: () =>
      import('./modules/paginas-estaticas/paginas-estaticas.module').then((m) => m.PaginasEstaticasModule),
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  { path: '**', redirectTo: 'errors/404' },
];

const reducers: ActionReducerMap<{ notifications: NotificationState }> = {
  notifications: notificationReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['notifications'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SocketIoModule.forRoot({ url: environment.wsUrl }),
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
