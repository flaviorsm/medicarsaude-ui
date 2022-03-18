import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaEnum, ParceiroModel, PlanoModel, RegisterComponent, StatusEnum } from '@medicar/core';
import { ParceiroService, PlanoService } from '@medicar/core/services';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'rts-registrar-parceiro',
  templateUrl: './registrar-parceiro.component.html',
  styleUrls: ['./registrar-parceiro.component.scss']
})
export class RegistrarParceiroComponent extends RegisterComponent<ParceiroModel, ParceiroService> {

  categoriaEnum = CategoriaEnum;
  categoriaEnumKeys: any[] = [];
  selectedCategoria = 0;

  planos: PlanoModel[] = [];
  selectedPlanos: string[] = [];

  dropdownSettings = {} as IDropdownSettings;

  constructor(
    private planoService: PlanoService,
    private fb: FormBuilder,
    service: ParceiroService,
    router: Router,
    activatedRoute: ActivatedRoute) {

    super(service, router, activatedRoute, 'parceiro');
    this.categoriaEnumKeys = Object.values(this.categoriaEnum).filter(value => typeof value === 'number');
  }

  get ehClinica(): boolean {
    return this.categoriaEnum[this.selectedCategoria] === this.categoriaEnum[CategoriaEnum.CLINICA];
  }

  initForm(): void {
    this.planoService.find().subscribe(result => this.planos = result ? result.data : []);
    this.form = this.fb.group({
      categoria: ['', Validators.required],
      planos: [''],
      status: [''],

      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      crm: ['', Validators.required],

      cnpj: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      ie: ['', Validators.required],
      dataFundacao: ['', Validators.required],

      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],

      cep: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Marcar todos',
      unSelectAllText: 'Desmarcar todos',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
  }

  formToModel(): ParceiroModel {
    return new ParceiroModel({
      categoria: super.formControl.categoria.value,
      status: super.formControl.status.value,
      planos: super.formControl.planos.value,

      nome: super.formControl.nome.value,
      email: super.formControl.email.value,
      telefone: super.formControl.telefone.value,

      cpf: super.formControl.cpf.value,
      rg: super.formControl.rg.value,
      dataNascimento: super.formControl.dataNascimento.value,
      CRM: super.formControl.crm.value,

      cnpj: super.formControl.cnpj.value,
      IE: super.formControl.IE.value,
      nomeFantasia: super.formControl.nomeFantasia.value,
      dataFundacao: super.formControl.dataFundacao.value,

      cep: super.formControl.cep.value,
      rua: super.formControl.rua.value,
      bairro: super.formControl.bairro.value,
      cidade: super.formControl.cidade.value,
      estado: super.formControl.estado.value,
    });
  }

  modelToForm(model: ParceiroModel | undefined): void {
    super.formControl.categoria.setValue(model?.categoria);
    super.formControl.status.setValue(model?.status);
    super.formControl.planos.setValue(model?.planos);
    super.formControl.nome.setValue(model?.nome);
    super.formControl.email.setValue(model?.email);
    super.formControl.telefone.setValue(model?.telefone);

    if (model?.categoria === CategoriaEnum.MEDICO) {
      super.formControl.cpf.setValue(model?.cpf);
      super.formControl.rg.setValue(model?.rg);
      super.formControl.dataNascimento.setValue(model?.dataNascimento);
      super.formControl.crm.setValue(model?.CRM);
    }

    if (model?.categoria === CategoriaEnum.CLINICA) {
      super.formControl.cnpj.setValue(model?.cnpj);
      super.formControl.nomeFantasia.setValue(model?.nomeFantasia);
      super.formControl.ie.setValue(model?.IE);
      super.formControl.dataFundacao.setValue(model?.dataFundacao);
    }

    super.formControl.cep.setValue(model?.cep);
    super.formControl.rua.setValue(model?.rua);
    super.formControl.bairro.setValue(model?.bairro);
    super.formControl.cidade.setValue(model?.cidade);
    super.formControl.estado.setValue(model?.estado);
  }

  changeCategoria(value: number): void {
    this.selectedCategoria = value;
    if (value === CategoriaEnum.MEDICO) {
      super.formControl.cnpj.setValue('');
      super.formControl.nomeFantasia.setValue('');
      super.formControl.ie.setValue('');
      super.formControl.dataFundacao.setValue('');
    }

    if (value === CategoriaEnum.CLINICA) {
      super.formControl.cpf.setValue('');
      super.formControl.rg.setValue('');
      super.formControl.dataNascimento.setValue('');
      super.formControl.crm.setValue('');
    }
  }
}
