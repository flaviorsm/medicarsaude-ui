import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CoreModule } from '@medicar/core/core.module';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [DashboardComponent, LineChartComponent, DoughnutChartComponent, PieChartComponent, BarChartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    NgChartsModule,
  ]
})
export class DashboardModule { }
