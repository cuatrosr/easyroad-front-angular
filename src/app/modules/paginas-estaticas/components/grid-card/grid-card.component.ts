import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.scss'],
  standalone: true,
  imports: [AngularSvgIconModule],
})
export class GridCardComponent {}
