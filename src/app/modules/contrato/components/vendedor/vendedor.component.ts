import { Component, Input, OnInit } from '@angular/core';
import { ColaboradorModel, FuncaoEnum, StatusEnum } from '@medicar/core';
import { Util } from '@medicar/core/shared/util';

@Component({
  selector: 'rts-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.scss']
})
export class VendedorComponent implements OnInit {

  @Input() vendedor = {} as ColaboradorModel;

  dataContratacao = '';
  funcaoEnum = '';
  status = '';

  constructor() { }

  ngOnInit(): void {
    this.dataContratacao = Util.formataData(this.vendedor.dataContratacao);
    this.funcaoEnum = FuncaoEnum[this.vendedor.status];
    this.status = StatusEnum[this.vendedor.status];
  }

}
