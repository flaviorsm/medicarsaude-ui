import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ColaboradorModel, FuncaoEnum, RegisterComponent, StatusEnum } from '@medicar/core';
import { ColaboradorService } from '@medicar/core/services';
import { Util } from '@medicar/core/shared/util';

@Component({
  selector: 'rts-registrar-colaborador',
  templateUrl: './registrar-colaborador.component.html',
  styleUrls: ['./registrar-colaborador.component.scss']
})
export class RegistrarColaboradorComponent extends RegisterComponent<ColaboradorModel, ColaboradorService> {

  constructor(
    private fb: FormBuilder,
    colaboradorService: ColaboradorService,
    router: Router,
    activatedRoute: ActivatedRoute) {

    super(colaboradorService, router, activatedRoute, 'colaborador');
  }

  initForm(): void {
    this.form = this.fb.group({
      funcao: ['', Validators.required],
      dataContratacao: ['', Validators.required],
      cpf: ['', Validators.required],
      ctps: ['', Validators.required],
      rg: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      status: [''],
      usuario: [''],
    });
  }

  formToModel(): ColaboradorModel {
    return new ColaboradorModel({
      funcao: this.funcaoEnum[super.formControl.funcao.value],
      dataContratacao: super.formControl.dataContratacao.value,
      cpf: super.formControl.cpf.value,
      ctps: super.formControl.ctps.value,
      rg: super.formControl.rg.value,
      dataNascimento: super.formControl.dataNascimento.value,
      nome: super.formControl.nome.value,
      email: super.formControl.email.value,
      telefone: super.formControl.telefone.value,
      cep: super.formControl.cep.value,
      rua: super.formControl.rua.value,
      bairro: super.formControl.bairro.value,
      cidade: super.formControl.cidade.value,
      estado: super.formControl.estado.value,
      usuario: super.formControl.usuario.value,
      status: super.formControl.status.value || undefined,
      codigo: this.model?.codigo || undefined,
    });
  }

  modelToForm(model: ColaboradorModel | undefined): void {
    if (model) {
      super.formControl.funcao.setValue(FuncaoEnum[model.funcao as keyof typeof FuncaoEnum]);
      super.formControl.dataContratacao.setValue(Util.formataData(model.dataContratacao));
      super.formControl.cpf.setValue(model.cpf);
      super.formControl.ctps.setValue(model.ctps);
      super.formControl.rg.setValue(model.rg);
      super.formControl.dataNascimento.patchValue(Util.formataData(model.dataNascimento));
      super.formControl.nome.setValue(model.nome);
      super.formControl.email.setValue(model.email);
      super.formControl.telefone.setValue(model.telefone);
      super.formControl.cep.setValue(model.cep);
      super.formControl.rua.setValue(model.rua);
      super.formControl.bairro.setValue(model.bairro);
      super.formControl.cidade.setValue(model.cidade);
      super.formControl.estado.setValue(model.estado);
      super.formControl.usuario.setValue(model.usuario);
      super.formControl.status.setValue(model.status);
    }
  }
}
