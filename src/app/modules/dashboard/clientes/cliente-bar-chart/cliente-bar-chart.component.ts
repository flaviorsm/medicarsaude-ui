import { DashboardService } from './../../../../core/services/dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'rts-cliente-bar-chart',
  templateUrl: './cliente-bar-chart.component.html',
  styleUrls: ['./cliente-bar-chart.component.scss']
})
export class ClienteBarChartComponent implements OnInit {

  chartType: ChartType = 'bar';
  chartOptions: any;
  chartData: any;
  chartPlugins = [DatalabelsPlugin];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.clientesPorMes().subscribe(res => {
      this.chartData = {
        datasets: [
          { data: res[0].data, },
        ],
      };

      this.chartOptions = {
        responsive: true,
        plugins: {
          legend: { display: false },
        }
      };
    });
  }

}
