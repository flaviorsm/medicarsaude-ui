import { Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncaoEnum, IService, StatusEnum } from '..';

@Inject({})
export abstract class RegisterComponent<T, TService extends IService<T>> implements OnInit {

    form!: FormGroup;

    funcaoEnum = FuncaoEnum;
    funcaoEnumKeys: any[] = [];
    statusEnum = StatusEnum;
    statusEnumKeys: any[] = [];

    hasError = false;
    message = '';

    idEntity: string | undefined;
    model!: T | undefined;

    patchModel: string;

    constructor(
        private service: TService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        patchModel: string) {
        this.patchModel = patchModel;
    }

    ngOnInit(): void {
        this.idEntity = this.activatedRoute.snapshot.paramMap.get('id') || undefined;
        this.funcaoEnumKeys = Object.values(this.funcaoEnum).filter(value => typeof value === 'number');
        this.statusEnumKeys = Object.values(this.statusEnum).filter(value => typeof value === 'number');
        this.initForm();
        this.getById(this.idEntity);
    }

    get isUpdate(): boolean {
        return this.idEntity !== undefined;
    }

    get formControl(): any {
        return this.form.controls;
    }

    abstract initForm(): void;

    abstract formToModel(): T;

    abstract modelToForm(model: T | undefined): void;

    register(id?: string): void {
        if (this.form.valid) {
            if (id) {
                this.update(id);
            } else {
                this.save();
            }
        } else {
            this.hasError = true;
            this.message = 'Todos os campos precisam ser preenchidos!';
        }
    }

    private save(): void {
        this.service.create(this.formToModel()).subscribe(_ => this.router.navigate(['/' + this.patchModel]));
    }

    private update(id: string): void {
        this.service.update(id, this.formToModel()).subscribe(_ => this.router.navigate(['/' + this.patchModel]));
    }

    private getById(id: string | undefined): void {
        if (id) {
            this.service.findById(id).subscribe(model => {
                this.model = model;
                this.modelToForm(model);
            });
        }
    }
}
