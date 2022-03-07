import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthModel, UserModel } from '@medicar/core';
import { TokenStorageService } from '@medicar/core/services';
import { Subscription, Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private unsubscribe: Subscription[] = [];

  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(private http: HttpClient, private router: Router, private tokenStorageService: TokenStorageService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  login(usuario: string, senha: string): Observable<AuthModel | {}> {
    this.isLoadingSubject.next(true);
    return this.http.post(`${environment.apiUrl}/login`, { usuario, senha }).pipe(
      map(auth => {
        const result = this.setTokenLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of({});
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  recuperar(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.http.post(`${environment.apiUrl}/recuperar`, { email }).pipe(
      map(() => true),
      catchError((err) => {
        console.error('err', err);
        return of(false);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout(): void {
    this.tokenStorageService.removeAuth();
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserModel | {}> {
    const auth = this.tokenStorageService.getAuthLocalStorage();
    if (!auth || !auth.token) {
      return of({});
    }
    const httpHeaders = new HttpHeaders({
      token: `${auth.token}`,
    });
    this.isLoadingSubject.next(true);
    return this.http.get<UserModel>(`${environment.apiUrl}/usuarios/${auth.userId}`, { headers: httpHeaders })
      .pipe(map((user: UserModel) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<UserModel>(user);
        } else {
          this.logout();
        }
        return user;
      }),
        catchError((err) => {
          console.error('err', err);
          this.logout();
          return of({});
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  registration(model: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.post(`${environment.apiUrl}/usuarios`, model).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(model.usuario || '', model.senha)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  private setTokenLocalStorage(auth: AuthModel): boolean {
    if (auth && auth.token) {
      this.tokenStorageService.setAuthLocalStorage(auth);
      return true;
    }
    return false;
  }

}
