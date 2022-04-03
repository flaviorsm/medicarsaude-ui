import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService, TokenStorageService } from '@medicar/core/services';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService, private notification: NotificationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          this.notification.showInfo(`Error: ${error.error.message}`, 'Este é um erro do lado do cliente');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          this.notification.showInfo(`Error Code: ${error.status},  Message: ${error.message}`, 'Este é um erro do lado do servidor');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        this.notification.showError(errorMsg, 'Error');
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
