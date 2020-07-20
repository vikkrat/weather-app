import {Component, Input, OnInit} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from 'ng-apexcharts';

export type chartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss']
})
export class WeatherChartComponent implements OnInit {
  public chartOptions = {};
  @Input() data = [];
  @Input() colors = [];

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      series: this.data,
      chart: {
        height: 230,
        type: 'area',
        zoom: false,
        toolbar: { tools: { download: false } },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.9,
          stops: [0, 70, 100]
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: this.colors,
      markers: {
        size: 3,
        colors: undefined,
        strokeColors: '#fff',
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          size: undefined,
          sizeOffset: 3
        }
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'category'
      },
      tooltip: {
        fillSeriesColor: '#4a6288',
        theme: 'light',
        style: {
          fontSize: '10px',
          fontFamily: 'Poppins',
          fontWeight: 600,
        }
      },
    };
  }

}
