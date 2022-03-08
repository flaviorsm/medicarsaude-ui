import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParceiroModel, ServiceBase } from '@medicar/core';
import { TokenStorageService } from '@medicar/core/services';

@Injectable({
  providedIn: 'root'
})
export class ParceiroService extends ServiceBase<ParceiroModel> {

  constructor(http: HttpClient, tokenStorageService: TokenStorageService) {
    super('parceiros', http, tokenStorageService);
  }
}
