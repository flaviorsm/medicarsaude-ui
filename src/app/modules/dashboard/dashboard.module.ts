import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@medicar/core/core.module';
import { NgChartsModule } from 'ng2-charts';
import { ClienteBarChartComponent } from './clientes/cliente-bar-chart/cliente-bar-chart.component';
import { ContratoPieChartComponent } from './contratos/contrato-pie-chart/contrato-pie-chart.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PagamentoDoughnutChartComponent } from './pagamentos/pagamento-doughnut-chart/pagamento-doughnut-chart.component';
import { VendaLineChartComponent } from './vendas/venda-line-chart/venda-line-chart.component';
import { VendaPieChartComponent } from './vendas/venda-pie-chart/venda-pie-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    VendaLineChartComponent,
    VendaPieChartComponent,
    PagamentoDoughnutChartComponent,
    ContratoPieChartComponent,
    ClienteBarChartComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    NgChartsModule,
  ]
})
export class DashboardModule { }
