import { Error500Component } from 'src/app/modules/error/pages/error500/error500.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ProjectsEmptyComponent } from '../projects-empty/projects-empty.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/core/models/global.model';
import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-projects-grid',
  templateUrl: './projects-grid.component.html',
  styleUrls: ['./projects-grid.component.scss'],
  standalone: true,
  imports: [NgStyle, NgFor, NgIf, LoadingComponent, Error500Component, ProjectsEmptyComponent, ProjectCardComponent],
})
export class ProjectsGridComponent implements OnInit {
  projectService = inject(ProjectService);
  messageService = inject(MessageService);
  projects: Project[] = [];
  loading: boolean = false;
  error: boolean = false;

  ngOnInit(): void {
    this.loadProjects();
  }

  private async loadProjects() {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (data: Project[]) => {
        this.projects = data;
        this.loading = false;
      },
      error: (error) => {
        this.handleError(error);
        this.loading = false;
        this.error = true;
      },
    });
  }

  handleError(error: { message: string }) {
    let errorMessage = error?.message || 'Error desconocido';
    if (errorMessage.startsWith('Http failure response for')) errorMessage = 'No se pudo conectar con el servidor';
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
  }
}
