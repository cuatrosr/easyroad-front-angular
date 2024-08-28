import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component, Input, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-grid-administracion-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.scss'],
  standalone: true,
  imports: [AngularSvgIconModule,TagModule,CommonModule],
})
export class GridCardComponent implements OnInit {
  @Input() alert = 0;
  @Input() working = 0;
  @Input() disconnected = 0;
  @Input() alertTotal = 0;

  ngOnInit(): void {}
}
