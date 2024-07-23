import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [AngularSvgIconModule, ButtonComponent],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.scss',
})
export class Error404Component {
  constructor(private router: Router) {}

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
