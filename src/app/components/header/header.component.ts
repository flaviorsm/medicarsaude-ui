import { AutenticacaoService } from '@medicar/core/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rts-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get nomeUsuario(): string {
    return this.autenticacaoService.currentUserValue.nome;
  }

  constructor(private autenticacaoService: AutenticacaoService) {
    console.log(this.autenticacaoService.currentUserValue);
  }

  ngOnInit(): void {
  }

}
