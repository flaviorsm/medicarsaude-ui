import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagamentoModel, ServiceBase } from '@medicar/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { NotificationService } from '..';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService extends ServiceBase<PagamentoModel> {

  constructor(http: HttpClient, notification: NotificationService) {
    super('pagamentos', http, notification);
  }

  createList(model: PagamentoModel[]): Observable<PagamentoModel[] | undefined> {
    this.isLoadingSubject.next(true);
    return this.http.post<PagamentoModel[]>(this.apiUrl, model)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error('Erro create', err);
          return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }
}
