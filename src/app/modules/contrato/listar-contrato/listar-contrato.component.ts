import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ContratoModel, ListComponent } from '@medicar/core';
import { ContratoService } from '@medicar/core/services';

@Component({
  selector: 'rts-listar-contrato',
  templateUrl: './listar-contrato.component.html',
  styleUrls: ['./listar-contrato.component.scss']
})
export class ListarContratoComponent extends ListComponent<ContratoModel, ContratoService> {

  constructor(service: ContratoService, private router: Router) {
    super(service);
  }
}
