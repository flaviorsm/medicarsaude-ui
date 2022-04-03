import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleEnum, UsuarioModel } from '@medicar/core';
import { AutenticacaoService } from '@medicar/core/services';
import { UsuarioService } from '@medicar/core/services/usuario/usuario.service';
import { Util } from '@medicar/core/shared/util';
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
  idEntity?: string;
  private unsubscribe: Subscription[] = [];
  private returnUrl?: string;

  constructor(
    private fb: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.isLoading$ = this.autenticacaoService.isLoading$;
    this.registrationForm = {} as FormGroup;
    this.hasError = false;
    this.message = '';
    this.idEntity = this.activatedRoute.snapshot.paramMap.get('id') || undefined;
    this.getById(this.idEntity);
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.activatedRoute.routeConfig?.data?.returnUrl;
  }

  get f(): any {
    return this.registrationForm.controls;
  }

  initForm(): void {
    if (!this.idEntity) {

      this.registrationForm = this.fb.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dataNascimento: ['', [Validators.required]],
        telefone: ['', [Validators.required, Validators.pattern(/^(\d{0,2})(\d{0,5})(\d{0,4})/g)]],
        cpf: ['', [Validators.required]],
        senha: ['', [Validators.required]],
        confirmaSenha: ['', [Validators.required]],
      });
    } else {
      this.registrationForm = this.fb.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dataNascimento: ['', [Validators.required]],
        telefone: ['', [Validators.required, Validators.pattern(/^(\d{0,2})(\d{0,5})(\d{0,4})/g)]],
        cpf: ['', [Validators.required]],
        senha: [''],
        confirmaSenha: [''],
      });
    }
  }

  registrar(): void {
    this.hasError = false;
    if (this.registrationForm.valid && this.confirmaSenha()) {
      const newUser = new UsuarioModel({
        nome: this.f.nome.value,
        cpf: this.f.cpf.value,
        email: this.f.email.value,
        telefone: this.f.telefone.value,
        dataNascimento: this.f.dataNascimento.value,
        usuario: this.f.email.value.toLowerCase(),
        senha: this.f.senha.value,
        regra: RoleEnum.CLIENTE
      });
      if (this.idEntity) {
        this.atualizar(this.idEntity, newUser);
      } else {
        this.salvar(newUser);
      }
    } else {
      this.hasError = true;
      this.message = 'Preencha todos os campos!';
    }
  }

  private atualizar(idEntity: string, newUser: UsuarioModel): void {
    const registrationSubscr = this.autenticacaoService
      .update(idEntity, newUser)
      .pipe(first())
      .subscribe((user: UsuarioModel) => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(registrationSubscr);
  }

  private salvar(newUser: UsuarioModel): void {
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
  }

  isValidDate(c: FormControl): ValidationErrors {
    let result = {} as ValidationErrors;
    const isValid = moment(c.value, 'DD/MM/YYYY').isValid();
    if (!isValid) {
      result = { invalidDate: 'Invalid date' };
    }
    return result;
  }

  modelToForm(model: UsuarioModel | undefined): void {
    if (model) {
      this.f.nome.setValue(model.nome);
      this.f.email.setValue(model.email);
      this.f.dataNascimento.patchValue(Util.formataData(model.dataNascimento));
      this.f.telefone.setValue(model.telefone);
      this.f.cpf.setValue(model.cpf);
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

  private getById(id: string | undefined): void {
    if (id) {
      this.usuarioService.findById(id).subscribe(model => {
        this.modelToForm(model);
      });
    }
  }

}
