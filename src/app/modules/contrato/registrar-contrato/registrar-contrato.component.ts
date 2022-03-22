import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContratoModel } from './../../../core/models/contrato.model';

@Component({
  selector: 'rts-registrar-contrato',
  templateUrl: './registrar-contrato.component.html',
  styleUrls: ['./registrar-contrato.component.scss']
})
export class RegistrarContratoComponent implements OnInit {

  contratoModel: ContratoModel;

  constructor(private router: Router) {
    this.contratoModel = this.router.getCurrentNavigation()?.extras.state as ContratoModel;
    console.log(this.contratoModel);
  }

  ngOnInit(): void {
  }

}
