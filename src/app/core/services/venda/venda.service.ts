import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceBase, VendaModel } from '@medicar/core';
import { NotificationService } from '..';

@Injectable({
  providedIn: 'root'
})
export class VendaService extends ServiceBase<VendaModel> {

  constructor(http: HttpClient, notification: NotificationService) {
    super('vendas', http, notification);
  }
}
