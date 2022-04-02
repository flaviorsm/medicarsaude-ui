import { Component, OnInit } from '@angular/core';
import { ListComponent, UsuarioModel, RoleEnum } from '@medicar/core';
import { UsuarioService } from '@medicar/core/services/usuario/usuario.service';

@Component({
  selector: 'rts-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent extends ListComponent<UsuarioModel, UsuarioService> {
  roleEnum = RoleEnum;

  constructor(service: UsuarioService) {
    super(service);
  }
}
