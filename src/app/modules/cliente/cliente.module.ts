import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClienteComponent, ListarClienteComponent, RegistrarClienteComponent } from '.';
import { CoreModule } from './../../core/core.module';
import { ClienteRoutingModule } from './cliente-routing.module';




@NgModule({
  declarations: [
    ClienteComponent,
    ListarClienteComponent,
    RegistrarClienteComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
