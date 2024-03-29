import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceBase } from '@medicar/core';
import { ContratoModel } from './../../models/contrato.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoService extends ServiceBase<ContratoModel> {

  constructor(http: HttpClient) {
    super('contratos', http);
  }
}
