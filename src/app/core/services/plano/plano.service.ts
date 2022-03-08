import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanoModel, ServiceBase } from '@medicar/core';
import { TokenStorageService } from '@medicar/core/services';

@Injectable({
  providedIn: 'root'
})
export class PlanoService extends ServiceBase<PlanoModel> {

  constructor(http: HttpClient, tokenStorageService: TokenStorageService) {
    super('planos', http, tokenStorageService);
  }
}
