import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '@medicar/core';
import { ListComponent } from '@medicar/core/base/list-component.base';
import { ClienteService } from '@medicar/core/services';

@Component({
  selector: 'rts-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.scss']
})
export class ListarClienteComponent extends ListComponent<ClienteModel, ClienteService> {

  constructor(service: ClienteService) {
    super(service);
  }

}
