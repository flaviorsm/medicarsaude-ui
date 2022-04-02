import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthModel } from '@medicar/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  getAuthLocalStorage(): AuthModel | undefined {
    const authStorage = localStorage.getItem(environment.sessionStorage);
    if (authStorage) {
      return JSON.parse(authStorage);
    }
    return undefined;
  }

  setAuthLocalStorage(auth: AuthModel): void {
    localStorage.setItem(environment.sessionStorage, JSON.stringify(auth));
  }

  removeAuth(): void {
    localStorage.removeItem(environment.sessionStorage);
  }
}
