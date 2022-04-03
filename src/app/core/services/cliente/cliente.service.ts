import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteModel } from '@medicar/core';
import { ServiceBase } from '@medicar/core/base/service-base';
import { NotificationService } from '..';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends ServiceBase<ClienteModel> {

  constructor(http: HttpClient, notification: NotificationService) {
    super('clientes', http, notification);
  }
}
