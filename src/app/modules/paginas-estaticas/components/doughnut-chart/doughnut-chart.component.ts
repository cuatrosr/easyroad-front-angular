import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Theme } from 'src/app/core/models/theme.model';
import { ChartModule, UIChart } from 'primeng/chart';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
  standalone: true,
  imports: [ChartModule],
})
export class DoughnutChartComponent implements OnInit {
  @ViewChild('doughnutChart') chart: UIChart | undefined;
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
      labels: ['Disconnect', 'Alert', 'Working'],
      datasets: [
        {
          data: [20, 200, 400],
          backgroundColor: ['rgba(156, 156, 156, 1)', 'rgba(255, 119, 119, 1)', 'rgba(105, 75, 219, 1)'],
          borderColor: ['rgba(156, 156, 156, 1)', 'rgba(255, 119, 119, 1)', 'rgba(105, 75, 219, 1)'],
        },
      ],
    };
  }

  private initializeChartOptions() {
    const colors = this.getCurrentThemeColors();
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
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
          text: 'Estado Actual de Postes',
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
