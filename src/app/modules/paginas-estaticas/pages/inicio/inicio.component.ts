import { DoughnutChartComponent } from '../../components/doughnut-chart/doughnut-chart.component';
import { BreadcrumbService } from 'src/app/modules/layout/services/breadcrumb.service';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { GridCardComponent } from '../../components/grid-card/grid-card.component';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [LogoComponent, LineChartComponent, GridCardComponent, BarChartComponent, DoughnutChartComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.setHomeBreadcrumb({
      icon: 'pi pi-home',
      routerLink: '/paginas/inicio',
    });
    this.breadcrumbService.setBreadcrumbs([]);
  }
}
