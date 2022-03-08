import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthModel, UsuarioModel } from '@medicar/core';
import { TokenStorageService } from '@medicar/core/services';
import { Subscription, Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService implements OnDestroy {

  private unsubscribe: Subscription[] = [];

  currentUser$: Observable<UsuarioModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UsuarioModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UsuarioModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private usuarioService: UsuarioService) {

    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.obterUsuarioPorToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  login(usuario: string, senha: string): Observable<UsuarioModel | undefined> {
    this.isLoadingSubject.next(true);
    return this.http.post<AuthModel>(`${environment.apiUrl}/login`, { usuario, senha }).pipe(
      map(auth => {
        this.tokenStorageService.setAuthLocalStorage(auth);
      }),
      switchMap(() => this.obterUsuarioPorToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
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

  obterUsuarioPorToken(): Observable<UsuarioModel | undefined> {
    const auth = this.tokenStorageService.getAuthLocalStorage();

    if (!auth || !auth.token) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.usuarioService.findById(auth.userId)
      .pipe(
        map(user => {
          if (user) {
            this.currentUserSubject = new BehaviorSubject<UsuarioModel>(user);
          } else {
            this.logout();
          }
          return user;
        }),
        catchError((err) => {
          console.error('err', err);
          this.logout();
          return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );

  }

  cadastro(model: UsuarioModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.usuarioService.create(model).pipe(
      map((user) => {
        this.isLoadingSubject.next(false);
        return user;
      }),
      switchMap(() => this.login(model.usuario || '', model.senha)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

}
