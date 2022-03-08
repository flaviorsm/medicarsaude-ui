import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColaboradorModel, ServiceBase } from '@medicar/core';
import { TokenStorageService } from '../storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService extends ServiceBase<ColaboradorModel> {

  constructor(http: HttpClient, tokenStorageService: TokenStorageService) {
    super('colaboradores', http, tokenStorageService);
  }
}
