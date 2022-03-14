import { Component, OnInit } from '@angular/core';
import { ColaboradorModel, StatusEnum } from '@medicar/core';
import { ColaboradorService } from '@medicar/core/services';

@Component({
  selector: 'rts-listar-colaborador',
  templateUrl: './listar-colaborador.component.html',
  styleUrls: ['./listar-colaborador.component.scss']
})
export class ListarColaboradorComponent implements OnInit {

  colaboradores: ColaboradorModel[] = [];
  statusEnum = StatusEnum;
  search = '';

  constructor(private serviceColaborador: ColaboradorService) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.serviceColaborador.find().subscribe(result => this.colaboradores = result ? result.data : []);
  }

  deletar(id?: string): void {
    if (id) {
      this.serviceColaborador.delete(id)
        .subscribe(_ => window.location.reload);
    }
  }

}
