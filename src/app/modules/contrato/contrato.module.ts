import { CoreModule } from '@medicar/core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoRoutingModule } from './contrato-routing.module';
import { ContratoComponent } from './contrato.component';
import { ListarContratoComponent } from './listar-contrato/listar-contrato.component';
import { RegistrarContratoComponent } from './registrar-contrato/registrar-contrato.component';
import { PlanoComponent } from './components/plano/plano.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { VendedorComponent } from './components/vendedor/vendedor.component';
import { EnderecoComponent } from './components/endereco/endereco.component';
import { PagamentoComponent } from './components/pagamento/pagamento.component';


@NgModule({
  declarations: [
    ContratoComponent,
    ListarContratoComponent,
    RegistrarContratoComponent,
    PlanoComponent,
    ClienteComponent,
    VendedorComponent,
    EnderecoComponent,
    PagamentoComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    ContratoRoutingModule,
  ]
})
export class ContratoModule { }
