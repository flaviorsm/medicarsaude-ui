import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParceiroModel, PlanoModel, RegisterComponent } from '@medicar/core';
import { ParceiroService, PlanoService } from '@medicar/core/services';
import { Util } from '@medicar/core/shared/util';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'rts-registrar-parceiro',
  templateUrl: './registrar-parceiro.component.html',
  styleUrls: ['./registrar-parceiro.component.scss']
})
export class RegistrarParceiroComponent extends RegisterComponent<ParceiroModel, ParceiroService> {

  categoriaData = [{ id: 1, nome: 'Clínica' }, { id: 2, nome: 'Médico(a)' }];
  categoriaSelected: any = {};
  settingsCategoria = {} as IDropdownSettings;

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

  }

  get ehClinica(): boolean {
    return this.categoriaSelected.id === 1;
  }

  get hasCategoriaSelected(): boolean {
    return this.categoriaSelected.id !== undefined;
  }

  initForm(): void {
    this.planoService.find().subscribe(result => this.planos = result ? result.data : []);
    this.form = this.fb.group({
      categoria: ['', Validators.required],
      planos: ['', Validators.required],
      status: [''],

      cpf: [''],
      rg: [''],
      dataNascimento: [''],
      crm: [''],

      cnpj: [''],
      nomeFantasia: [''],
      ie: [''],
      dataFundacao: [''],

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
      allowSearchFilter: false,
      closeDropDownOnSelection: true,
    };

    this.settingsCategoria = {
      singleSelection: true,
      idField: 'id',
      textField: 'nome',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      closeDropDownOnSelection: true,
    };
  }

  formToModel(): ParceiroModel {
    return new ParceiroModel({
      categoria: super.formControl.categoria.value[0],
      status: super.formControl.status.value || undefined,
      planos: this.getIdPlanos(super.formControl.planos.value),

      nome: super.formControl.nome.value,
      email: super.formControl.email.value,
      telefone: super.formControl.telefone.value,

      cpf: super.formControl.cpf.value,
      rg: super.formControl.rg.value,
      dataNascimento: super.formControl.dataNascimento.value,
      CRM: super.formControl.crm.value,

      cnpj: super.formControl.cnpj.value,
      IE: super.formControl.ie.value,
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
    if (model) {
      this.categoriaSelected = model.categoria;
      super.formControl.categoria.setValue([this.categoriaSelected]);

      super.formControl.status.setValue(model.status);
      super.formControl.planos.setValue(model.planos);
      super.formControl.nome.setValue(model.nome);
      super.formControl.email.setValue(model.email);
      super.formControl.telefone.setValue(model.telefone);

      if (model.categoria.id === 1) {
        super.formControl.cnpj.setValue(model.cnpj);
        super.formControl.nomeFantasia.setValue(model.nomeFantasia);
        super.formControl.ie.setValue(model.IE);
        super.formControl.dataFundacao.setValue(Util.formataData(model.dataFundacao ?? new Date()));
      }

      if (model.categoria.id === 2) {
        super.formControl.cpf.setValue(model.cpf);
        super.formControl.rg.setValue(model.rg);
        super.formControl.dataNascimento.setValue(Util.formataData(model.dataNascimento ?? new Date()));
        super.formControl.crm.setValue(model.CRM);
      }

      super.formControl.cep.setValue(model.cep);
      super.formControl.rua.setValue(model.rua);
      super.formControl.bairro.setValue(model.bairro);
      super.formControl.cidade.setValue(model.cidade);
      super.formControl.estado.setValue(model.estado);
    }
  }

  onSelectAll(items: any): void {
    this.selectedPlanos = items;
  }

  onItemSelect(item: any): void {
    this.categoriaSelected = item;
    if (this.ehClinica) {
      super.formControl.cnpj.setValue('');
      super.formControl.nomeFantasia.setValue('');
      super.formControl.ie.setValue('');
      super.formControl.dataFundacao.setValue('');
    } else {
      super.formControl.cpf.setValue('');
      super.formControl.rg.setValue('');
      super.formControl.dataNascimento.setValue('');
      super.formControl.crm.setValue('');
    }
  }

  onDeSelect(): void {
    this.categoriaSelected = {};

    super.formControl.cnpj.setValue('');
    super.formControl.nomeFantasia.setValue('');
    super.formControl.ie.setValue('');
    super.formControl.dataFundacao.setValue('');

    super.formControl.cpf.setValue('');
    super.formControl.rg.setValue('');
    super.formControl.dataNascimento.setValue('');
    super.formControl.crm.setValue('');

  }

  private getIdPlanos(planos: PlanoModel[]): string[] {
    const ids: string[] = [];
    for (const plano of planos) {
      if (plano.id) {
        ids.push(plano.id);
      }
    }
    return ids;
  }

}
