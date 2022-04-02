import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterComponent } from '@medicar/core';
import { UsuarioService } from '@medicar/core/services/usuario/usuario.service';
import { Util } from '@medicar/core/shared/util';
import { UsuarioModel } from './../../../core/models/usuario.model';

@Component({
  selector: 'rts-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent extends RegisterComponent<UsuarioModel, UsuarioService> {

  constructor(
    private fb: FormBuilder,
    service: UsuarioService,
    router: Router,
    activatedRoute: ActivatedRoute) {

    super(service, router, activatedRoute, 'usuario');
  }

  initForm(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.pattern(/^(\d{0,2})(\d{0,5})(\d{0,4})/g)]],
      cpf: ['', [Validators.required]],
      senha: [''],
      confirmaSenha: [''],
    });
  }

  formToModel(): UsuarioModel {
    return {
      nome: super.formControl.nome.value,
      cpf: super.formControl.cpf.value,
      email: super.formControl.email.value,
      telefone: super.formControl.telefone.value,
      dataNascimento: super.formControl.dataNascimento.value,
      usuario: super.formControl.email.value.toLowerCase(),
      senha: super.formControl.senha.value || undefined,
    };
  }

  modelToForm(model: UsuarioModel | undefined): void {
    if (model) {
      super.formControl.nome.setValue(model.nome);
      super.formControl.email.setValue(model.email);
      super.formControl.dataNascimento.patchValue(Util.formataData(model.dataNascimento));
      super.formControl.telefone.setValue(model.telefone);
      super.formControl.cpf.setValue(model.cpf);
    }
  }
}
