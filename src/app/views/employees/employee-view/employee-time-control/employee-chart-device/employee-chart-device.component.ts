import { Component, ViewChild, inject } from '@angular/core';
import { ThemeColors } from '@aw/core/types/theme-colors';
import { ThemeColorService } from '@aw/services/_index';
import { ApexAxisChartSeries, ApexChart, ApexTheme, ApexTitleSubtitle, ApexXAxis, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
};
// @see https://apexcharts.com/docs/installation/
@Component({
  selector: 'aw-employee-chart-device',
  templateUrl: './employee-chart-device.component.html'
})
export class EmployeeChartDeviceComponent {
  private readonly themeColorService = inject(ThemeColorService);

  @ViewChild('chart') chart!: ChartComponent;

  chartOptions: Partial<ChartOptions>;

  theme: ApexTheme = {};

  constructor() {
    const theme = this.themeColorService.getThemeValue() === ThemeColors.dark ? 'dark' : 'light';

    this.theme = {
      mode: theme,
      palette: 'palette10'
    };

    this.chartOptions = {
      series: [
        {
          name: 'My-series',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      title: {
        text: 'My First Angular Chart'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    };
  }
}
