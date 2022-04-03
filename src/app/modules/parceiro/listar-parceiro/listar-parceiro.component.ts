import { Component } from '@angular/core';
import { ListComponent, ParceiroModel } from '@medicar/core';
import { ParceiroService } from '@medicar/core/services';

@Component({
  selector: 'rts-listar-parceiro',
  templateUrl: './listar-parceiro.component.html',
  styleUrls: ['./listar-parceiro.component.scss']
})
export class ListarParceiroComponent extends ListComponent<ParceiroModel, ParceiroService> {

  constructor(service: ParceiroService) {
    super(service);
  }
}
