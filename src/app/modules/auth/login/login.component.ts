import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService, NotificationService } from '@medicar/core/services';
import { NavigationService } from '@medicar/core/services/navigation/navigation.service';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
@Component({
  selector: 'rts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = {} as FormGroup;
  hasError = false;
  isValidFormSubmitted = false;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router,
    private navigation: NavigationService,
    private notification: NotificationService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f(): any {
    return this.loginForm.controls;
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  logar(): void {
    this.hasError = false;
    this.isValidFormSubmitted = true;
    if (this.loginForm.valid) {
      this.isValidFormSubmitted = false;
      const loginSubscr = this.authService
        .login(this.f.usuario.value, this.f.senha.value)
        .pipe(first())
        .subscribe((user) => {
          if (user) {
            this.navigation.back();
          } else {
            this.hasError = true;
            this.notification.showError('Usuário ou senha inválidos', 'Login inválido');
          }
        });
      this.unsubscribe.push(loginSubscr);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
