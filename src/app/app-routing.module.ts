import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

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

@NgModule({
  imports: [RouterModule.forRoot(routes), SocketIoModule.forRoot({ url: environment.wsUrl })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
