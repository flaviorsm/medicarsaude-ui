import { ClienteService } from '@medicar/core/services';
import { ClienteModel, RegisterComponent } from '@medicar/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from '@medicar/core/shared/util';

@Component({
  selector: 'rts-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.scss']
})
export class RegistrarClienteComponent extends RegisterComponent<ClienteModel, ClienteService> {

  constructor(
    private fb: FormBuilder,
    service: ClienteService,
    router: Router,
    activatedRoute: ActivatedRoute) {

    super(service, router, activatedRoute, 'cliente');
  }

  initForm(): void {
    this.form = this.fb.group({
      cpf: ['', Validators.required],
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
    });
  }

  formToModel(): ClienteModel {
    return new ClienteModel({
      cpf: super.formControl.cpf.value,
      dataNascimento: super.formControl.dataNascimento.value,
      nome: super.formControl.nome.value,
      email: super.formControl.email.value,
      telefone: super.formControl.telefone.value,
      cep: super.formControl.cep.value,
      rua: super.formControl.rua.value,
      bairro: super.formControl.bairro.value,
      cidade: super.formControl.cidade.value,
      estado: super.formControl.estado.value,
      status: super.formControl.status.value || undefined,
      codigo: this.model?.codigo || undefined,
    });
  }

  modelToForm(model: ClienteModel | undefined): void {
    if (model) {
      super.formControl.cpf.setValue(model.cpf);
      super.formControl.dataNascimento.patchValue(Util.formataData(model.dataNascimento));
      super.formControl.nome.setValue(model.nome);
      super.formControl.email.setValue(model.email);
      super.formControl.telefone.setValue(model.telefone);
      super.formControl.cep.setValue(model.cep);
      super.formControl.rua.setValue(model.rua);
      super.formControl.bairro.setValue(model.bairro);
      super.formControl.cidade.setValue(model.cidade);
      super.formControl.estado.setValue(model.estado);
      super.formControl.status.setValue(model.status);
    }
  }
}
