import { Project } from 'src/app/core/models/global.model';
import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  imports: [NgStyle],
  standalone: true,
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
