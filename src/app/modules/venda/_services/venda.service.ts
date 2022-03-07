import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceBase, VendaModel } from '@medicar/core';
import { TokenStorageService } from '@medicar/core/services';

@Injectable({
  providedIn: 'root'
})
export class VendaService extends ServiceBase<VendaModel> {

  constructor(http: HttpClient, tokenStorageService: TokenStorageService) {
    super('vendas', http, tokenStorageService);
  }
}
