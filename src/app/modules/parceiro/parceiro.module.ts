import { CoreModule } from '@medicar/core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParceiroRoutingModule } from './parceiro-routing.module';
import { ParceiroComponent } from './parceiro.component';
import { ListarParceiroComponent } from './listar-parceiro/listar-parceiro.component';
import { RegistrarParceiroComponent } from './registrar-parceiro/registrar-parceiro.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    ParceiroComponent,
    ListarParceiroComponent,
    RegistrarParceiroComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    ParceiroRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class ParceiroModule { }
