import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) { }

  vendasPorMes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vendas/mensal`)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error('Erro create', err);
          return of(undefined);
        })
      );
  }

  vendasPorStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vendas/status`)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error('Erro create', err);
          return of(undefined);
        })
      );
  }

  pagamentosPorStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pagamentos`)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error('Erro create', err);
          return of(undefined);
        })
      );
  }

  contratosAtivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contratos`)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error('Erro create', err);
          return of(undefined);
        })
      );
  }

  clientesPorMes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clientes/mensal`)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error('Erro create', err);
          return of(undefined);
        })
      );
  }

  clientesPorStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clientes/status`)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error('Erro create', err);
          return of(undefined);
        })
      );
  }

}
