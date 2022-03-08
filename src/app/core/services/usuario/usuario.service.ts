import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '@medicar/core';
import { ServiceBase } from '@medicar/core/base/service-base';
import { TokenStorageService } from '../storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceBase<UsuarioModel> {

  constructor(http: HttpClient, tokenStorageService: TokenStorageService) {
    super('usuarios', http, tokenStorageService);
  }
}
