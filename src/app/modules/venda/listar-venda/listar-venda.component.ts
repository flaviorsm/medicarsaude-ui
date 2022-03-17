import { VendaModel } from './../../../core/models/venda.model';
import { Component, OnInit } from '@angular/core';
import { VendaService } from '@medicar/core/services';
import { ListComponent } from '@medicar/core';

@Component({
  selector: 'rts-listar-venda',
  templateUrl: './listar-venda.component.html',
  styleUrls: ['./listar-venda.component.scss']
})
export class ListarVendaComponent extends ListComponent<VendaModel, VendaService> {

  constructor(service: VendaService) {
    super(service);
  }

}
