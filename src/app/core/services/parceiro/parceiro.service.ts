import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParceiroModel, ServiceBase } from '@medicar/core';
import { NotificationService } from '..';

@Injectable({
  providedIn: 'root'
})
export class ParceiroService extends ServiceBase<ParceiroModel> {

  constructor(http: HttpClient, notification: NotificationService) {
    super('parceiros', http, notification);
  }
}
