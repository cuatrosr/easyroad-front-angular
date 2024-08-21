import { Project } from 'src/app/core/models/global.model';
import { Component, inject, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  imports: [NgStyle],
  standalone: true,
})
export class ProjectCardComponent {
  @Input() project!: Project;
  router = inject(Router);

  navigateToProject() {
    this.router.navigate(['/administracion/ver_proyecto/', this.project._id]);
  }
}
