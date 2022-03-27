import { Component, Input, OnInit } from '@angular/core';
import { ContratoModel, PagamentoModel, PlanoModel, StatusPagamentoEnum } from '@medicar/core';
import { PagamentoService } from '@medicar/core/services';
import { Util } from '@medicar/core/shared/util';
import * as moment from 'moment';

@Component({
  selector: 'rts-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  @Input() contrato?: ContratoModel;

  pagamentos: PagamentoModel[] = [];
  statusPagamentoEnum = StatusPagamentoEnum;
  novaDataVenimento!: string;

  constructor(private pagamentoService: PagamentoService) {
  }

  ngOnInit(): void {
    this.novaDataVenimento = Util.formataData(new Date());
    this.pagamentos = this.contrato?.pagamentos || [];
  }

  gerarPagamento(): void {
    const novoPagamento: PagamentoModel[] = [];
    novoPagamento.push({
      codigo: Util.codigoAleatorio(),
      contrato: this.contrato?.id || '',
      dataPagamento: undefined,
      dataVencimento: new Date(this.novaDataVenimento),
      referencia: new Date(this.novaDataVenimento),
      status: StatusPagamentoEnum.PENDENTE,
      valorPago: this.contrato?.venda.plano.valor,
    });

    this.pagamentoService.createList(novoPagamento).subscribe(result => {
      if (result && result.length > 0) {
        this.pagamentos.push(...novoPagamento);
      }
    });
  }

  efetivar(id?: string): void {
    if (id) {
      const today = moment().format('YYYY-MM-DD');
      this.pagamentoService.path(id, { dataPagamento: today, status: StatusPagamentoEnum.EFETIVADO })
        .subscribe(res => {
          this.pagamentos.forEach(item => {
            if (item.id === id) {
              item.status = res.status;
              item.dataPagamento = new Date(today);
            }
          });
        });
    }
  }

  cancelar(id?: string): void {
    if (id) {
      this.pagamentoService.path(id, { status: StatusPagamentoEnum.CANCELADO })
        .subscribe(res => {
          this.pagamentos.forEach(item => {
            if (item.id === id) {
              item.status = res.status;
            }
          });
        });
    }
  }

  reativar(id?: string): void {
    if (id) {
      this.pagamentoService.path(id, { status: StatusPagamentoEnum.PENDENTE })
        .subscribe(res => {
          this.pagamentos.forEach(item => {
            if (item.id === id) {
              item.status = res.status;
            }
          });
        });
    }
  }

  gerarBoleto(): void {


  }

}
