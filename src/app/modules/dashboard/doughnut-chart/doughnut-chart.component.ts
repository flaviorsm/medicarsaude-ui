import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'rts-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  @Input() dataChart: any[] = [];
  @Input() labelsChart: string[] = [];

  doughnutChartType: ChartType = 'doughnut';
  doughnutChartData = {} as ChartData<'doughnut'>;
  doughnutChartOptions = {} as ChartConfiguration['options'];

  constructor() { }

  ngOnInit(): void {

    this.doughnutChartData = {
      labels: this.labelsChart,
      datasets: [
        { data: this.dataChart },
      ],
    };

    this.doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };
  }

}
