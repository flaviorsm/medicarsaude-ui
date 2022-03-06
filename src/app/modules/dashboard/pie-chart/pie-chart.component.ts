import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'rts-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() dataChart: any[] = [];
  @Input() labelsChart: any[] = [];

  pieChartType: ChartType = 'pie';
  pieChartOptions = {} as ChartConfiguration['options'];
  pieChartData = {} as ChartData<'pie', number[], string | string[]>;

  constructor() { }

  ngOnInit(): void {
    this.pieChartData = {
      labels: this.labelsChart,
      datasets: [{
        data: this.dataChart
      }]
    };

    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      maintainAspectRatio: false,
    };
  }

}
