import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParceiroModel, ServiceBase } from '@medicar/core';

@Injectable({
  providedIn: 'root'
})
export class ParceiroService extends ServiceBase<ParceiroModel> {

  constructor(http: HttpClient) {
    super('parceiros', http);
  }
}
