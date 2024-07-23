import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects-empty',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './projects-empty.component.html',
  styleUrl: './projects-empty.component.scss',
})
export class ProjectsEmptyComponent {}
