import { notificationReducer } from 'src/app/core/store/reducer/notification.reducer';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  {
    path: 'paginas',
    component: LayoutComponent,
    loadChildren: () => import('../paginas-estaticas/paginas-estaticas.module').then((m) => m.PaginasEstaticasModule),
  },
  {
    path: 'administracion',
    component: LayoutComponent,
    loadChildren: () => import('../administracion/administracion.module').then((m) => m.AdministracionModule),
  },
  { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes), StoreModule.forFeature('notifications', notificationReducer)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
