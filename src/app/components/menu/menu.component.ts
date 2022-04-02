import { UsuarioModel } from './../../core/models/usuario.model';
import { TokenStorageService } from '@medicar/core/services';
import { Component, OnInit } from '@angular/core';
import { RoleEnum } from '@medicar/core';

@Component({
  selector: 'rts-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  roleEnum = RoleEnum;
  regra?: RoleEnum;

  constructor(storageService: TokenStorageService) {
    this.regra = storageService.getAuthLocalStorage()?.role;
  }

  ngOnInit(): void {
  }

}
