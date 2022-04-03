import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@medicar/core/services';
import { ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'rts-contrato-pie-chart',
  templateUrl: './contrato-pie-chart.component.html',
  styleUrls: ['./contrato-pie-chart.component.scss']
})
export class ContratoPieChartComponent implements OnInit {

  chartType: ChartType = 'pie';
  chartOptions: any;
  chartData: any;
  chartPlugins = [DatalabelsPlugin];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.contratosAtivos().subscribe(res => {
      this.chartData = {
        labels: ['Ativos', 'Inativos'],
        datasets: [{
          data: [res.ativos, (res.total - res.ativos)]
        }],
      };

      this.chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        }
      };
    });
  }

}
