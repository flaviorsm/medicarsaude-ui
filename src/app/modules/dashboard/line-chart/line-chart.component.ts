import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'rts-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() dataChart: any[] = [];
  @Input() labelsChart: any[] = [];

  lineChartType: ChartType = 'line';
  lineChartData = {} as ChartConfiguration['data'];
  lineChartOptions = {} as ChartConfiguration['options'];

  constructor() { }

  ngOnInit(): void {
    this.lineChartData = {
      datasets: [
        {
          data: this.dataChart,
          label: 'Contratos',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ],
      labels: this.labelsChart
    };

    this.lineChartOptions = {
      responsive: true,
      elements: {
        line: {
          tension: 0.5
        }
      },
      scales: {
        x: {},
        'y-axis-0':
        {
          position: 'left',
        },
        'y-axis-1': {
          position: 'right',
          grid: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            color: 'red'
          }
        }
      },

      plugins: {
        legend: { display: false },
      }
    };
  }
}
