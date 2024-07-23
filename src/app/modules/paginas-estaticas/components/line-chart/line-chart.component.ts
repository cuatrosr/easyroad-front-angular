import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Theme } from 'src/app/core/models/theme.model';
import { ChartModule, UIChart } from 'primeng/chart';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  standalone: true,
  imports: [ChartModule],
})
export class LineChartComponent implements OnInit {
  @ViewChild('lineChart') chart: UIChart | undefined;
  themeService = inject(ThemeService);
  currentTheme: Theme | undefined;
  data: any;
  options: any;

  ngOnInit(): void {
    this.themeService.themeChanges.subscribe((theme: Theme) => {
      this.currentTheme = theme;
      this.updateChartOptions();
    });
    this.initializeChartData();
    this.initializeChartOptions();
  }

  private initializeChartData() {
    this.data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'],
      datasets: [
        {
          label: 'Working',
          lineTension: 0.4,
          data: [1, 2, 1, 4, 5, 6, 7, 8],
          borderColor: 'rgba(105, 75, 219, 1)',
          backgroundColor: 'rgba(105, 75, 219, 1)',
        },
        {
          label: 'Alert',
          lineTension: 0.4,
          data: [8, 7, 6, 5, 4, 3, 2, 1],
          borderColor: 'rgba(255, 119, 119, 1)',
          backgroundColor: 'rgba(255, 119, 119, 1)',
        },
      ],
    };
  }

  private initializeChartOptions() {
    const colors = this.getCurrentThemeColors();
    this.options = {
      maintainAspectRatio: true,
      responsive: true,
      scales: {
        x: {
          type: 'category',
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
          ticks: {
            font: {
              family: 'Montserrat',
              weight: 'normal',
              size: 12,
            },
            color: colors.mutedTextColor,
          },
          grid: {
            color: colors.gridColor,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: 'Montserrat',
              weight: 'normal',
              size: 12,
            },
            color: colors.mutedTextColor,
          },
          grid: {
            color: colors.gridColor,
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
          titleFont: {
            family: 'Montserrat',
            size: 14,
          },
          bodyFont: {
            family: 'Montserrat',
            size: 12,
          },
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            font: {
              family: 'Montserrat',
              weight: 'normal',
              size: 14,
            },
            color: colors.mutedTextColor,
          },
        },
        title: {
          display: true,
          text: 'Postes Historicos',
          font: {
            family: 'Montserrat',
            weight: 'bold',
            size: 20,
          },
          color: colors.textColor,
        },
      },
    };
  }

  private updateChartOptions() {
    if (this.options && this.chart) {
      const colors = this.getCurrentThemeColors();
      this.options.scales.x.ticks.color = colors.mutedTextColor;
      this.options.scales.x.grid.color = colors.gridColor;
      this.options.scales.y.ticks.color = colors.mutedTextColor;
      this.options.scales.y.grid.color = colors.gridColor;
      this.options.plugins.legend.labels.color = colors.mutedTextColor;
      this.options.plugins.title.color = colors.textColor;
      this.chart.options = this.options;
      this.chart.reinit();
    }
  }

  private getCurrentThemeColors() {
    const computedStyle = getComputedStyle(document.documentElement);
    const foregroundHSL = computedStyle.getPropertyValue('--foreground').trim();
    const mutedForegroundHSL = computedStyle.getPropertyValue('--muted-foreground').trim();
    const gridHSL = computedStyle.getPropertyValue('--border').trim();
    const textColor = `hsl(${foregroundHSL})`;
    const mutedTextColor = `hsl(${mutedForegroundHSL})`;
    const gridColor = `hsl(${gridHSL})`;
    return { textColor, mutedTextColor, gridColor };
  }
}
