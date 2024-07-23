import { ProjectsGridComponent } from '../../components/projects-grid/projects-grid.component';
import { BreadcrumbService } from 'src/app/modules/layout/services/breadcrumb.service';
import { ProjectService } from '../../services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss',
  imports: [ProjectsGridComponent, ToastModule, HttpClientModule],
  providers: [ProjectService, MessageService],
})
export class ProyectosComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.setHomeBreadcrumb({
      icon: 'pi pi-chart-line',
      routerLink: '/paginas/proyectos',
    });
    this.breadcrumbService.setBreadcrumbs([]);
  }
}
