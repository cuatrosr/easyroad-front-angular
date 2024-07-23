import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ChartModule, UIChart } from 'primeng/chart';
import { Theme } from 'src/app/core/models/theme.model';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: true,
  imports: [ChartModule],
})
export class BarChartComponent implements OnInit {
  @ViewChild('barChart') chart: UIChart | undefined;
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
      labels: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6'],
      datasets: [
        {
          label: 'Working',
          data: [200, 300, 400, 500, 600, 700],
          backgroundColor: 'rgba(105, 75, 219, 1)',
        },
        {
          label: 'Alert',
          data: [120, 190, 300, 500, 200, 300],
          backgroundColor: 'rgba(255, 119, 119, 1)',
        },
      ],
    };
  }

  private initializeChartOptions() {
    const colors = this.getCurrentThemeColors();
    this.options = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          type: 'category',
          labels: ['Proj 1', 'Proj 2', 'Proj 3', 'Proj 4', 'Proj 5', 'Proj 6'],
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
          text: 'Estado Actual de Proyectos',
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
