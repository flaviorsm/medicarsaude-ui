import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'rts-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() dataChart: any[] = [];
  @Input() labelsChart: any[] = [];

  barChartType: ChartType = 'bar';
  barChartOptions = {} as ChartConfiguration['options'];
  barChartData = {} as ChartData<'bar'>;

  constructor() { }

  ngOnInit(): void {
    this.barChartData = {
      labels: this.labelsChart,
      datasets: this.dataChart
    };

    this.barChartOptions = {
      responsive: true,
      scales: {
        x: {},
        y: {
          min: 0
        }
      },
      plugins: {
        legend: {
          display: true,
        }
      }
    };
  }
}
