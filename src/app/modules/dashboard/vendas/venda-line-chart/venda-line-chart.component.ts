import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@medicar/core/services';
import { ChartConfiguration, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'rts-venda-line-chart',
  templateUrl: './venda-line-chart.component.html',
  styleUrls: ['./venda-line-chart.component.scss']
})
export class VendaLineChartComponent implements OnInit {

  chartType: ChartType = 'line';
  chartData = {} as ChartConfiguration['data'];
  chartOptions = {} as ChartConfiguration['options'];
  chartPlugins = [DatalabelsPlugin];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.vendasPorMes().subscribe(res => {
      this.chartData = {
        datasets: [
          {
            data: res[0].data,
            label: 'Vendas',
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
          },
        ],
      };

      this.chartOptions = {
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
            position: 'right',
          },
          'y-axis-1': {
            position: 'left',
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
    });
  }

}
