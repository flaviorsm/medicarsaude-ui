import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendaRoutingModule } from './venda-routing.module';
import { VendaComponent } from './venda.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ListaComponent } from './listar/lista.component';


@NgModule({
  declarations: [
    VendaComponent,
    ListaComponent,
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    VendaRoutingModule
  ]
})
export class VendaModule { }
