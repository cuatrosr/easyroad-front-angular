import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-administracion-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.scss'],
  standalone: true,
  imports: [AngularSvgIconModule],
})
export class GridCardComponent implements OnInit {
  @Input() alert = 0;
  @Input() working = 0;
  @Input() disconnected = 0;

  ngOnInit(): void {}
}
