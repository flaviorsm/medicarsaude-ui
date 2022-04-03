import { Inject, OnInit } from '@angular/core';
import { Util } from '@medicar/core/shared/util';
import { IService, StatusEnum } from '..';
import { RoleEnum } from '../enums/role.enum';

@Inject({})
export abstract class ListComponent<T, TService extends IService<T>> implements OnInit {

    listModels: T[] = [];
    statusEnum = StatusEnum;
    roleEnum = RoleEnum;
    search = '';

    constructor(protected service: TService) {
    }

    verificarRegra(regras: number[]): boolean {
        return Util.hasPermission(regras);
    }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.service.find().subscribe(result => this.listModels = result ? result.data : []);
    }

    deletar(id: string): void {
        this.service.delete(id).subscribe(result => {
            if (result) {
                this.listModels = this.listModels.filter((obj: any) => obj.id !== id);
            }
        });
    }

    disable(id: string): void {
        this.service.disable(id).subscribe(result => {
            if (result) {
                this.listModels = this.listModels.map((obj: any) => {
                    if (obj.id === id) {
                        obj.status = StatusEnum.INATIVO;
                    }
                    return obj;
                });
            }
        });
    }
}
