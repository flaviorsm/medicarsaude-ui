import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ColaboradorModel, FuncaoEnum, StatusEnum } from '@medicar/core';
import { ColaboradorService } from '@medicar/core/services';
import { Util } from '@medicar/core/shared/util';

@Component({
  selector: 'rts-registrar-colaborador',
  templateUrl: './registrar-colaborador.component.html',
  styleUrls: ['./registrar-colaborador.component.scss']
})
export class RegistrarColaboradorComponent implements OnInit {

  form!: FormGroup;
  funcaoEnum = FuncaoEnum;
  funcaoEnumKeys: any[] = [];
  statusEnum = StatusEnum;
  statusEnumKeys: any[] = [];
  hasError = false;
  message = '';
  idEntity: string | undefined;
  model!: ColaboradorModel | undefined;

  constructor(
    private colaboradorService: ColaboradorService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.funcaoEnumKeys = Object.values(this.funcaoEnum).filter(value => typeof value === 'number');
    this.statusEnumKeys = Object.values(this.statusEnum).filter(value => typeof value === 'number');
    this.initForm();
    this.idEntity = this.activatedRoute.snapshot.paramMap.get('id') || undefined;
    this.obter(this.idEntity);
  }

  get isUpdate(): boolean {
    return this.idEntity !== undefined;
  }

  get formControl(): any {
    return this.form.controls;
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

  registrar(id?: string): void {
    if (this.form.valid) {
      if (id) {
        this.atualizar(id);
      } else {
        this.salvar();
      }
    } else {
      this.hasError = true;
      this.message = 'Todos os campos precisam ser preenchidos!';
    }
  }

  private salvar(): void {
    this.colaboradorService.create(this.preencherModel()).subscribe(_ => this.router.navigate(['/colaborador']));
  }

  private atualizar(id: string): void {
    this.colaboradorService.update(id, this.preencherModel()).subscribe(_ => this.router.navigate(['/colaborador']));
  }

  private obter(id: string | undefined): void {
    if (id) {
      this.colaboradorService.findById(id).subscribe(model => this.preencherForm(model));
    }
  }

  private preencherModel(): ColaboradorModel {
    const model = new ColaboradorModel(this.model?.codigo);
    model.funcao = this.funcaoEnum[this.formControl.funcao.value];
    model.dataContratacao = this.formControl.dataContratacao.value;
    model.cpf = this.formControl.cpf.value;
    model.ctps = this.formControl.ctps.value;
    model.rg = this.formControl.rg.value;
    model.dataNascimento = this.formControl.dataNascimento.value;
    model.nome = this.formControl.nome.value;
    model.email = this.formControl.email.value;
    model.telefone = this.formControl.telefone.value;
    model.cep = this.formControl.cep.value;
    model.rua = this.formControl.rua.value;
    model.bairro = this.formControl.bairro.value;
    model.cidade = this.formControl.cidade.value;
    model.estado = this.formControl.estado.value;
    model.usuario = this.formControl.usuario.value;
    model.status = this.formControl.status.value ?? StatusEnum.ATIVO;
    return model;
  }

  private preencherForm(model: ColaboradorModel | undefined): void {
    this.model = model;
    if (model) {
      this.formControl.funcao.setValue(FuncaoEnum[model.funcao as keyof typeof FuncaoEnum]);
      this.formControl.dataContratacao.setValue(Util.formataData(model.dataContratacao));
      this.formControl.cpf.setValue(model.cpf);
      this.formControl.ctps.setValue(model.ctps);
      this.formControl.rg.setValue(model.rg);
      this.formControl.dataNascimento.patchValue(Util.formataData(model.dataNascimento));
      this.formControl.nome.setValue(model.nome);
      this.formControl.email.setValue(model.email);
      this.formControl.telefone.setValue(model.telefone);
      this.formControl.cep.setValue(model.cep);
      this.formControl.rua.setValue(model.rua);
      this.formControl.bairro.setValue(model.bairro);
      this.formControl.cidade.setValue(model.cidade);
      this.formControl.estado.setValue(model.estado);
      this.formControl.usuario.setValue(model.usuario);
      this.formControl.status.setValue(model.status);
    }
  }

}
