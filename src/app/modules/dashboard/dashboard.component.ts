import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@medicar/core/services';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'rts-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }


}
