import { Component, Input, OnInit } from '@angular/core';
import { PagamentoModel, StatusPagamentoEnum } from '@medicar/core';

@Component({
  selector: 'rts-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  @Input() pagamentos: PagamentoModel[] = [];

  statusPagamentoEnum = StatusPagamentoEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
