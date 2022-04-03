import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@medicar/core/core.module';
import { ListarVendaComponent } from './listar-venda/listar-venda.component';
import { RegistrarVendaComponent } from './registrar-venda/registrar-venda.component';
import { VendaRoutingModule } from './venda-routing.module';
import { VendaComponent } from './venda.component';

@NgModule({
  declarations: [
    VendaComponent,
    ListarVendaComponent,
    RegistrarVendaComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    VendaRoutingModule
  ]
})
export class VendaModule { }
