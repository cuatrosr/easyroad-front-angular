import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { PaginasEstaticasComponent } from './paginas-estaticas.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PaginasEstaticasComponent,
    children: [
      { path: 'inicio', component: InicioComponent, pathMatch: 'full' },
      { path: 'proyectos', component: ProyectosComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppEstaticasModule {}
