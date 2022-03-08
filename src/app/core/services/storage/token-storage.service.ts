import { Injectable } from '@angular/core';
import { AuthModel } from '@medicar/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private localStorageSession = 'sessionId';

  constructor() { }

  getAuthLocalStorage(): AuthModel | undefined {
    const authStorage = localStorage.getItem(this.localStorageSession);
    if (authStorage) {
      return JSON.parse(authStorage);
    }
    return undefined;
  }

  setAuthLocalStorage(auth: AuthModel): void {
    localStorage.setItem(this.localStorageSession, JSON.stringify(auth));
  }

  removeAuth(): void {
    localStorage.removeItem(this.localStorageSession);
  }
}
