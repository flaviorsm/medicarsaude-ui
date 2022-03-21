import { ContratoModel } from './../../../core/models/contrato.model';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanoModel, RegisterComponent, StatusEnum, VendaModel } from '@medicar/core';
import { StatusPagamentoEnum } from '@medicar/core/enums/status-pagamento.enum';
import { ClienteService, ColaboradorService, ContratoService, PlanoService, VendaService } from '@medicar/core/services';
import { Util } from '@medicar/core/shared/util';
import { ClienteModel } from './../../../core/models/cliente.model';
import { ColaboradorModel } from './../../../core/models/colaborador.model';

@Component({
  selector: 'rts-registrar-venda',
  templateUrl: './registrar-venda.component.html',
  styleUrls: ['./registrar-venda.component.scss']
})
export class RegistrarVendaComponent extends RegisterComponent<VendaModel, VendaService> {

  planos: PlanoModel[] = [];
  idPlano = '';
  valorPlano = 0;

  statusPagamentoEnum = StatusPagamentoEnum;
  statusPagamentoEnumKeys: any[] = [];

  vendedores: ColaboradorModel[] = [];
  idVendedor = '';

  cliente!: ClienteModel;

  constructor(
    private planoService: PlanoService,
    private colaboradorService: ColaboradorService,
    private clienteService: ClienteService,
    private contratoService: ContratoService,
    private fb: FormBuilder,
    service: VendaService,
    router: Router,
    activatedRoute: ActivatedRoute) {

    super(service, router, activatedRoute, 'venda');
  }

  get possuiCliente(): boolean {
    return this.cliente !== undefined;
  }

  get pagamentoEfetivado(): boolean {
    return this.model?.statusPagamento === StatusPagamentoEnum.EFETIVADO;
  }

  get possuiContrato(): boolean {
    return this.model?.contrato !== undefined;
  }

  initForm(): void {
    this.statusPagamentoEnumKeys = Object.values(this.statusPagamentoEnum).filter(value => typeof value === 'number');
    this.planoService.find().subscribe(result => this.planos = result ? result.data : []);
    this.colaboradorService.find().subscribe(result => this.vendedores = result ? result.data : []);
    this.form = this.fb.group({
      vendedor: ['', Validators.required],
      plano: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      statusPagamento: [''],
      cep: [''],
      rua: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
    });
  }

  register(id?: string): void {
    if (!this.cliente) {
      this.clienteService.create(this.clienteFormToModel()).subscribe(result => {
        this.cliente = result || {} as ClienteModel;
        super.register();
      });
    } else {
      super.register(id);
    }
  }

  formToModel(): VendaModel {
    return  new VendaModel({
      codigo: this.model?.codigo || undefined,
      statusPagamento: super.formControl.statusPagamento.value !== '' ? super.formControl.statusPagamento.value : undefined,
      cliente: this.cliente.id,
      plano: this.idPlano,
      vendedor: this.idVendedor,
      dataVenda: new Date(),
    });
  }

  modelToForm(model: VendaModel | undefined): void {
    if (model) {
      this.cliente = model.cliente;
      this.clienteToForm(this.cliente);
      super.formControl.vendedor.setValue(model.vendedor.id);
      super.formControl.plano.setValue(model.plano.id);
      super.formControl.statusPagamento.setValue(model.statusPagamento);
      this.valorPlano = model.plano.valor;
    }
  }

  changePlano(idSelectedPlano: string): void {
    this.idPlano = idSelectedPlano;
    const plano = this.planos.find(x => x.id === idSelectedPlano);
    this.valorPlano = plano ? plano.valor : 0;
  }

  changeVendedor(idSeletedVendedor: string): void {
    if (idSeletedVendedor) {
      this.idVendedor = idSeletedVendedor;
    }
  }

  searchCliente(): void {
    this.clienteService.find('cpf', this.formControl.cpf.value).subscribe(result => {
      console.log(result);
      if (result && result.data.length > 0) {
        this.cliente = result.data[0];
        this.clienteToForm(this.cliente);
      }
    });
  }

  changePagamento(value: number): void {
    if (this.model && this.model.id && this.model.statusPagamento !== value) {
      this.service.path(this.model.id, { statusPagamento: value }).subscribe(result => {
        if (result && this.model) {
          this.model.statusPagamento = result.statusPagamento;
        }
      });
    }
  }

  gerarContrato(): void {
    const contrato = new ContratoModel();
    contrato.codigo = Util.codigoAleatorio();
    contrato.status = StatusEnum.ATIVO;
    contrato.plano = this.idPlano;
    contrato.venda = this.idEntity;
    this.contratoService.create(contrato).subscribe(cont => {
      if (this.idEntity) {
        this.service.path(this.idEntity, { contrato: cont?.id }).subscribe(_ => {
          this.router.navigate(['/' + this.patchModel]);
        });
      }
    });
  }

  private clienteToForm(cliente: ClienteModel): void {
    super.formControl.cpf.setValue(cliente.cpf);
    super.formControl.dataNascimento.patchValue(Util.formataData(cliente.dataNascimento));
    super.formControl.nome.setValue(cliente.nome);
    super.formControl.email.setValue(cliente.email);
    super.formControl.telefone.setValue(cliente.telefone);
    if (!this.isUpdate) {
      super.formControl.cep.setValue(cliente.cep);
      super.formControl.rua.setValue(cliente.rua);
      super.formControl.bairro.setValue(cliente.bairro);
      super.formControl.cidade.setValue(cliente.cidade);
      super.formControl.estado.setValue(cliente.estado);
    }
  }

  private clienteFormToModel(): ClienteModel {
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
      status: StatusEnum.ATIVO,
      codigo: undefined,
    });
  }
}
