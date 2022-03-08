import { ServiceBase } from '@medicar/core/base/service-base';
import { Injectable } from '@angular/core';
import { ClienteModel } from '@medicar/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '..';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends ServiceBase<ClienteModel> {

  constructor(http: HttpClient, tokenStorageService: TokenStorageService) {
    super('clientes', http, tokenStorageService);
  }
}
