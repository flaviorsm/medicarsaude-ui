import { Component, OnInit } from '@angular/core';
import { RoleEnum } from '@medicar/core';
import { Util } from '@medicar/core/shared/util';

@Component({
  selector: 'rts-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  roleEnum = RoleEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

  verificarRegra(regras: number[]): boolean {
    return Util.hasPermission(regras);
  }

}
