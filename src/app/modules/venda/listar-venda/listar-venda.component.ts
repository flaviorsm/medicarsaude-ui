import { Component } from '@angular/core';
import { ListComponent, StatusPagamentoEnum } from '@medicar/core';
import { VendaService } from '@medicar/core/services';
import { VendaModel } from './../../../core/models/venda.model';

@Component({
  selector: 'rts-listar-venda',
  templateUrl: './listar-venda.component.html',
  styleUrls: ['./listar-venda.component.scss']
})
export class ListarVendaComponent extends ListComponent<VendaModel, VendaService> {

  statusPagamento = StatusPagamentoEnum;

  constructor(service: VendaService) {
    super(service);
  }

}
