import { Component, OnInit } from '@angular/core';
import { ColaboradorModel, ListComponent, StatusEnum } from '@medicar/core';
import { ColaboradorService } from '@medicar/core/services';

@Component({
  selector: 'rts-listar-colaborador',
  templateUrl: './listar-colaborador.component.html',
  styleUrls: ['./listar-colaborador.component.scss']
})
export class ListarColaboradorComponent extends ListComponent<ColaboradorModel, ColaboradorService> {

  constructor(serviceColaborador: ColaboradorService) {
    super(serviceColaborador);
  }
}
