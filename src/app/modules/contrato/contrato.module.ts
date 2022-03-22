import { CoreModule } from '@medicar/core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoRoutingModule } from './contrato-routing.module';
import { ContratoComponent } from './contrato.component';
import { ListarContratoComponent } from './listar-contrato/listar-contrato.component';
import { RegistrarContratoComponent } from './registrar-contrato/registrar-contrato.component';
import { PlanoComponent } from './componets/plano/plano.component';


@NgModule({
  declarations: [
    ContratoComponent,
    ListarContratoComponent,
    RegistrarContratoComponent,
    PlanoComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    ContratoRoutingModule,
  ]
})
export class ContratoModule { }
