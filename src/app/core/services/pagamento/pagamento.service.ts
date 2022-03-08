import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagamentoModel, ServiceBase } from '@medicar/core';
import { TokenStorageService } from '@medicar/core/services';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService extends ServiceBase<PagamentoModel> {

  constructor(http: HttpClient, tokenStorageService: TokenStorageService) {
    super('pagamentos', http, tokenStorageService);
  }
}
