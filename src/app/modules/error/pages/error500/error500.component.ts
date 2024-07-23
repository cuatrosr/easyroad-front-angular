import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error500',
  standalone: true,
  imports: [AngularSvgIconModule, ButtonComponent],
  templateUrl: './error500.component.html',
})
export class Error500Component {
  constructor(private router: Router) {}

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
