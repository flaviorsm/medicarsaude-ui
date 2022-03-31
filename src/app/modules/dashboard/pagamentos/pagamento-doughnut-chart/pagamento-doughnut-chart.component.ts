import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@medicar/core/services';
import { Util } from '@medicar/core/shared/util';
import { ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'rts-pagamento-doughnut-chart',
  templateUrl: './pagamento-doughnut-chart.component.html',
  styleUrls: ['./pagamento-doughnut-chart.component.scss']
})
export class PagamentoDoughnutChartComponent implements OnInit {

  chartType: ChartType = 'doughnut';
  chartData: any;
  chartOptions: any;
  chartPlugins = [DatalabelsPlugin];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {

    const labels: any[] = [];
    const data: any[] = [];

    this.dashboardService.pagamentosPorStatus().subscribe(res => {
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
          datalabels: {
            formatter: (value: any, ctx: any) => {
              let sum = 0;
              const dataArray = ctx.chart.data.datasets[0].data;
              dataArray.map((dat: any) => {
                sum += dat;
              });
              const percentage = (value * 100 / sum).toFixed(2) + '%';
              return percentage;
            },
            color: '#667',
          }
        }
      };

    });


  }

}
