import { AgregarProyectosComponent } from './pages/agregar-proyecto/agregar-proyecto.component';
import { AgregarPosteComponent } from './pages/agregar-poste/agregar-poste.component';
import { VerProyectoComponent } from './pages/ver-proyecto/ver-proyecto.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { VerPosteComponent } from './pages/ver-poste/ver-poste.component';
import { AdministracionComponent } from './administracion.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AdministracionComponent,
    children: [
      { path: 'proyectos', component: ProyectosComponent, pathMatch: 'full' },
      { path: 'agregar_proyecto', component: AgregarProyectosComponent, pathMatch: 'full' },
      { path: 'ver_proyecto/:id', component: VerProyectoComponent, pathMatch: 'full' },
      { path: 'ver_proyecto/:id/agregar_poste', component: AgregarPosteComponent, pathMatch: 'full' },
      { path: 'ver_poste/:serial', component: VerPosteComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppAdministracionModule {}
