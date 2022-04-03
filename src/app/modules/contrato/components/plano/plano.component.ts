import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PlanoModel, StatusEnum } from '@medicar/core';

@Component({
  selector: 'rts-plano',
  templateUrl: './plano.component.html',
  styleUrls: ['./plano.component.scss']
})
export class PlanoComponent implements OnInit {

  @Input() plano = {} as PlanoModel;

  statusPlano = '';

  valorPlano = '';

  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.valorPlano = this.currencyPipe.transform(this.plano.valor, 'BRL') ?? '';
    this.statusPlano = StatusEnum[this.plano.status];
  }

}
