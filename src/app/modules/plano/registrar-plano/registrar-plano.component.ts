import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanoModel, RegisterComponent, StatusEnum } from '@medicar/core';
import { PlanoService } from '@medicar/core/services';

@Component({
  selector: 'rts-registrar-plano',
  templateUrl: './registrar-plano.component.html',
  styleUrls: ['./registrar-plano.component.scss']
})
export class RegistrarPlanoComponent extends RegisterComponent<PlanoModel, PlanoService> {

  constructor(
    private fb: FormBuilder,
    service: PlanoService,
    router: Router,
    activatedRoute: ActivatedRoute) {

    super(service, router, activatedRoute, 'plano');
  }

  initForm(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
      status: [''],
    });
  }

  formToModel(): PlanoModel {
    return {
      nome: super.formControl.nome.value,
      valor: super.formControl.valor.value,
      descricao: super.formControl.descricao.value,
      status: super.formControl.status.value || StatusEnum.ATIVO
    };
  }

  modelToForm(model: PlanoModel | undefined): void {
    super.formControl.nome.setValue(model?.nome);
    super.formControl.valor.setValue(model?.valor);
    super.formControl.descricao.setValue(model?.descricao);
    super.formControl.status.setValue(model?.status);
  }

}
