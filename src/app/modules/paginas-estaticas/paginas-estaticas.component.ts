import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-paginas-estaticas',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './paginas-estaticas.component.html',
  styleUrl: './paginas-estaticas.component.scss'
})
export class PaginasEstaticasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

}
