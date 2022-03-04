import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '@medicar/models';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services';

@Component({
  selector: 'rts-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    this.registrationForm = {} as FormGroup;
    this.hasError = false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f(): any {
    return this.registrationForm.controls;
  }

  initForm(): void {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      confirmaSenha: ['', [Validators.required]],
    });
  }

  registrar(): void {
    this.hasError = false;
    if (this.registrationForm.valid) {
      const newUser = new UserModel({
        nome: this.f.nome.value,
        cpf: this.f.cpf.value,
        email: this.f.email.value,
        telefone: this.f.telefone.value,
        dataNascimento: new Date(this.f.dataNascimento.value),
        usuario: this.f.nome.value.split(' ', 1)[0].toLowerCase(),
        senha: this.f.senha.value,
      });

      const registrationSubscr = this.authService
        .registration(newUser)
        .pipe(first())
        .subscribe((user: UserModel) => {
          if (user) {
            this.router.navigate(['/']);
          } else {
            this.hasError = true;
          }
        });
      this.unsubscribe.push(registrationSubscr);
    }
  }
}
