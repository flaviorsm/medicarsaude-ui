import { ClienteService, ColaboradorService, PlanoService, VendaService } from '@medicar/core/services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaModel, PlanoModel, StatusEnum } from '@medicar/core';

@Component({
  selector: 'rts-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  valorPlano = '';
  planos: PlanoModel[] = [];
  idPlano = '';

  constructor(
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private planoService: PlanoService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || undefined;
    this.obterVenda(id);
    this.initForm();
  }

  get formControl(): any {
    return this.form.controls;
  }

  initForm(): void {
    this.planoService.find().subscribe(result => this.planos = result ? result.data : []);
    this.form = this.fb.group({
      plano: ['', Validators.required],
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
    });
  }

  salvarVenda(): void {
    this.clienteService.create(this.preencherCliente()).subscribe(cli => {
      if (cli && cli.id) {
        this.vendaService.create(this.preencherVenda(cli.id)).subscribe(venda => {
          console.log('===>' + venda);
        });
      }
    });
  }

  changePlano(plano: PlanoModel): void {
    this.idPlano = plano.id || '';
  }

  preencherVenda(idCliente: string): any {
    return {
      codigo: 'VEN-12345',
      cliente: idCliente,
      plano: this.idPlano,
      vendedor: '622526fccacb802dcf849627',
      dataVenda: new Date()
    };
  }

  preencherCliente(): any {
    return {
      nome: this.formControl.nome.value,
      email: this.formControl.email.value,
      telefone: this.formControl.telefone.value,
      cpf: this.formControl.cpf.value,
      dataNascimento: this.formControl.dataNascimento.value,
      codigo: 'CLI-12345',
      status: StatusEnum.ATIVO,
      cep: this.formControl.cep.value,
      rua: this.formControl.rua.value,
      bairro: this.formControl.bairro.value,
      cidade: this.formControl.cidade.value,
      estado: this.formControl.estado.value,
    };
  }

  private obterVenda(id?: string): void {
    if (id) {
      this.vendaService.findById(id).subscribe(model => {
        if (model) {
          this.clienteService.findById(model.cliente).subscribe(cliente => {
            model.cliente = cliente;
            this.preencherFormulario(model);
          });
        }
      });
    }
  }

  private preencherFormulario(model: VendaModel): void {
    console.log(model);

    const end = model.cliente.pessoaFisica.pessoa.endereco;
    const pessoa = model.cliente.pessoaFisica.pessoa;

    this.formControl.plano.setValue(model.plano);
    this.formControl.cpf.setValue(model.cliente.pessoaFisica.cpf);
    this.formControl.nome.setValue(pessoa.nome);
    this.formControl.dataNascimento.setValue(model.cliente.pessoaFisica.dataNascimento);
    this.formControl.email.setValue(pessoa.email);
    this.formControl.telefone.setValue(pessoa.telefone);
    this.formControl.cep.setValue(end.cep);
    this.formControl.rua.setValue(end.rua);
    this.formControl.bairro.setValue(end.bairro);
    this.formControl.cidade.setValue(end.cidade);
    this.formControl.estado.setValue(end.estado);
  }

}
