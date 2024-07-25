import { HttpClientModule } from '@angular/common/http';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    RouterOutlet,
    HttpClientModule,
  ],
})
export class AppComponent {
  title = 'Easyroad';

  constructor(public themeService: ThemeService) {}
}
