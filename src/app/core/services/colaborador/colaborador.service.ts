import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColaboradorModel, ServiceBase } from '@medicar/core';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService extends ServiceBase<ColaboradorModel> {

  constructor(http: HttpClient) {
    super('colaboradores', http);
  }
}
