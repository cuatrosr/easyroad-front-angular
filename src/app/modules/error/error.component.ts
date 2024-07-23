import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './error.component.html',
})
export class ErrorComponent {}
