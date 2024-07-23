import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
  standalone: true,
  imports: [AngularSvgIconModule],
})
export class BottomNavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
