import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanoModel, StatusEnum } from '@medicar/core';
import { PlanoService } from '@medicar/core/services';

@Component({
  selector: 'rts-registrar-plano',
  templateUrl: './registrar-plano.component.html',
  styleUrls: ['./registrar-plano.component.scss']
})
export class RegistrarPlanoComponent implements OnInit {

  form!: FormGroup;
  hasError = false;
  message = '';
  title = '';
  statusEnum = StatusEnum;
  statusEnumKeys: any[] = [];

  constructor(
    private fb: FormBuilder,
    private planoService: PlanoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.title = this.idPlano ? 'Alterar plano' : 'Inserir novo plano';
    this.obter(this.idPlano);
    this.statusEnumKeys = Object.values(this.statusEnum).filter(value => typeof value === 'number');
  }

  get idPlano(): string | undefined {
    return this.activatedRoute.snapshot.paramMap.get('id') || undefined;
  }

  get formControl(): any {
    return this.form.controls;
  }

  initForm(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
      status: [''],
    });
  }

  registrar(id?: string): void {
    if (this.form.valid) {
      if (id) {
        this.atualizar(id);
      } else {
        this.salvar();
      }
    }
  }

  private salvar(): void {
    this.planoService.create(this.preencherModel())
      .subscribe(
        _ => this.router.navigate(['/plano']),
        err => {
          this.hasError = true;
          this.message = err.message;
        }
      );
  }

  private atualizar(id: string): void {
    this.planoService.update(id, this.preencherModel()).subscribe(
      _ => this.router.navigate(['/plano']),
      err => {
        this.hasError = true;
        this.message = err.message;
      }
    );
  }

  private obter(id: string | undefined): void {
    if (id) {
      this.planoService.findById(id).subscribe(
        model => {
          this.preencherForm(model);
        },
        err => {
          this.hasError = true;
          this.message = err.message;
        }
      );
    }
  }

  private preencherModel(): PlanoModel {
    return {
      nome: this.formControl.nome.value,
      valor: this.formControl.valor.value,
      descricao: this.formControl.descricao.value,
      status: this.formControl.status.value || StatusEnum.ATIVO
    };
  }

  private preencherForm(model: PlanoModel | undefined): void {
    this.formControl.nome.setValue(model?.nome);
    this.formControl.valor.setValue(model?.valor);
    this.formControl.descricao.setValue(model?.descricao);
    this.formControl.status.setValue(model?.status);
  }
}
