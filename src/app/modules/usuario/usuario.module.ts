import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { CoreModule } from '@medicar/core/core.module';


@NgModule({
  declarations: [
    UsuarioComponent,
    ListarUsuarioComponent,
    RegistrarUsuarioComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
