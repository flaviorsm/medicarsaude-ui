import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CoreModule } from '@medicar/core/core.module';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    NgChartsModule,
  ]
})
export class DashboardModule { }
