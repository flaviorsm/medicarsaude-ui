import { Component, OnInit } from '@angular/core';
import { VendaModel } from '@medicar/core';
import { VendaService } from '@medicar/core/services';

@Component({
  selector: 'rts-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  vendas: VendaModel[] = [];

  constructor(private vendaService: VendaService) { }

  ngOnInit(): void {
    this.getVenda();
  }

  getVenda(): void {
    this.vendaService.find().subscribe(vendas => {
      if (vendas) {
        this.vendas = vendas;
      }
    });
  }

  deletar(id: string): void {
    this.vendaService.delete(id).subscribe(res => console.log(res));
  }
}
