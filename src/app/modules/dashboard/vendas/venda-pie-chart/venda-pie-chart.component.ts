import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@medicar/core/services';
import { Util } from '@medicar/core/shared/util';
import { ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'rts-venda-pie-chart',
  templateUrl: './venda-pie-chart.component.html',
  styleUrls: ['./venda-pie-chart.component.scss']
})
export class VendaPieChartComponent implements OnInit {

  chartType: ChartType = 'pie';
  chartOptions: any;
  chartData: any;
  chartPlugins = [DatalabelsPlugin];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    const labels: any[] = [];
    const data: any[] = [];

    this.dashboardService.vendasPorStatus().subscribe(res => {
      Object.keys(res).forEach(i => {
        data.push(res[i].count);
        labels.push(Util.textoStatusPagamentoEnumConfig(res[i]._id.status));
      });

      this.chartData = {
        labels,
        datasets: [
          { data },
        ],
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
