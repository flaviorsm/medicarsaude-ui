import { Util } from '@medicar/core/shared/util';
import { Component, OnInit, Input } from '@angular/core';
import { ClienteModel, StatusEnum } from '@medicar/core';

@Component({
  selector: 'rts-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  @Input() cliente = {} as ClienteModel;

  dataNascimento = '';

  statusPlano = '';

  constructor() { }

  ngOnInit(): void {
    this.statusPlano = StatusEnum[this.cliente.status];
    this.dataNascimento = Util.formataData(this.cliente.dataNascimento);
  }

}
