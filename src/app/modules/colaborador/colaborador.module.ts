import { CoreModule } from '@medicar/core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ListarColaboradorComponent } from './listar-colaborador/listar-colaborador.component';
import { ColaboradorComponent } from './colaborador.component';
import { RegistrarColaboradorComponent } from './registrar-colaborador/registrar-colaborador.component';


@NgModule({
  declarations: [
    ListarColaboradorComponent,
    ColaboradorComponent,
    RegistrarColaboradorComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    ColaboradorRoutingModule
  ]
})
export class ColaboradorModule { }
