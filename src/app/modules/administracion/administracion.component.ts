import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.scss'
})
export class AdministracionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

}
