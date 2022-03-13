import { Component, OnInit } from '@angular/core';
import { PlanoModel, StatusEnum } from '@medicar/core';
import { PlanoService } from '@medicar/core/services';

@Component({
  selector: 'rts-listar-plano',
  templateUrl: './listar-plano.component.html',
  styleUrls: ['./listar-plano.component.scss']
})
export class ListarPlanoComponent implements OnInit {

  planos: PlanoModel[] = [];
  statusEnum = StatusEnum;
  search = '';

  constructor(private planoService: PlanoService) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.planoService.find().subscribe(result => this.planos = result ? result.data : []);
  }

  pesquisar(event: any): void {
    console.log(event.text);
  }

  deletar(id?: string): void {
    if (id) {
      this.planoService.delete(id)
        .subscribe(_ => window.location.reload);
    }
  }

}
