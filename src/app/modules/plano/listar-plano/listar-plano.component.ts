import { Component } from '@angular/core';
import { ListComponent, PlanoModel } from '@medicar/core';
import { PlanoService } from '@medicar/core/services';

@Component({
  selector: 'rts-listar-plano',
  templateUrl: './listar-plano.component.html',
  styleUrls: ['./listar-plano.component.scss']
})
export class ListarPlanoComponent extends ListComponent<PlanoModel, PlanoService> {

  constructor(service: PlanoService) {
    super(service);
  }

}
