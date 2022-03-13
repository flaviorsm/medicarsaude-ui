import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagamentoModel, ServiceBase } from '@medicar/core';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService extends ServiceBase<PagamentoModel> {

  constructor(http: HttpClient) {
    super('pagamentos', http);
  }
}