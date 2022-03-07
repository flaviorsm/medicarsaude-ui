import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from '@medicar/core';
import { AutenticacaoService } from '@medicar/core/services';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'rts-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  message: string;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {
    this.isLoading$ = this.autenticacaoService.isLoading$;
    this.registrationForm = {} as FormGroup;
    this.hasError = false;
    this.message = '';
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
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required, this.isValidDate]],
      telefone: ['', [Validators.required, Validators.pattern(/^(\d{0,2})(\d{0,5})(\d{0,4})/g)]],
      cpf: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      confirmaSenha: ['', [Validators.required]],
    });
  }

  registrar(): void {
    this.hasError = false;
    if (this.registrationForm.valid && this.confirmaSenha()) {
      const newUser = new UsuarioModel({
        nome: this.f.nome.value,
        cpf: this.f.cpf.value,
        email: this.f.email.value,
        telefone: this.f.telefone.value,
        dataNascimento: new Date(this.f.dataNascimento.value),
        usuario: this.f.nome.value.split(' ', 1)[0].toLowerCase(),
        senha: this.f.senha.value,
      });

      const registrationSubscr = this.autenticacaoService
        .cadastro(newUser)
        .pipe(first())
        .subscribe((user: UsuarioModel) => {
          if (user) {
            this.router.navigate(['/']);
          } else {
            this.hasError = true;
          }
        });
      this.unsubscribe.push(registrationSubscr);
    } else {
      this.hasError = true;
      this.message = 'Preencha todos os campos!';
    }
  }

  private confirmaSenha(): boolean {
    const senha = this.f.senha.value;
    const cSenha = this.f.confirmaSenha.value;

    if (senha !== cSenha) {
      this.hasError = true;
      this.message = 'Senha não conferi!';
      return false;
    }

    return true;
  }

  isValidDate(c: FormControl): ValidationErrors {
    let result = {} as ValidationErrors;
    const isValid = moment(c.value, 'DD/MM/YYYY').isValid();
    if (!isValid) {
      result = { invalidDate: 'Invalid date' };
    }
    return result;
  }
}
