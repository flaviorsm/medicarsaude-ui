import { AutenticacaoService, TokenStorageService } from '@medicar/core/services';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private autenticacaoService: AutenticacaoService, private tokenStorageService: TokenStorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('Este é um erro do lado do cliente');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('Este é um erro do lado do servidor');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }

  addAuthToken(request: HttpRequest<unknown>): HttpRequest<any> {
    const auth = this.tokenStorageService.getAuthLocalStorage();

    return request.clone({
      setHeaders: {
        token: `${auth?.token}`,
      }
    });
  }
}
