import { NotificationService } from '@medicar/core/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanoModel, ServiceBase } from '@medicar/core';

@Injectable({
  providedIn: 'root'
})
export class PlanoService extends ServiceBase<PlanoModel> {

  constructor(http: HttpClient, notification: NotificationService) {
    super('planos', http, notification);
  }
}
