import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlanoRoutingModule } from './plano-routing.module';
import { PlanoComponent } from './plano.component';
import { RegistrarPlanoComponent } from './registrar-plano/registrar-plano.component';
import { ListarPlanoComponent } from './listar-plano/listar-plano.component';
import { CoreModule } from '@medicar/core/core.module';



@NgModule({
  declarations: [
    PlanoComponent,
    ListarPlanoComponent,
    RegistrarPlanoComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    PlanoRoutingModule,
  ]
})
export class PlanoModule { }
