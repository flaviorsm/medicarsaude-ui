import { Inject, OnInit } from '@angular/core';
import { IService, StatusEnum } from '..';

@Inject({})
export abstract class ListComponent<T, TService extends IService<T>> implements OnInit {

    listModels: T[] = [];
    statusEnum = StatusEnum;
    search = '';

    constructor(protected service: TService) { }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.service.find().subscribe(result => this.listModels = result ? result.data : []);
    }

    deletar(id?: string): void {
        if (id) {
            this.service.delete(id)
                .subscribe(_ => window.location.reload);
        }
    }
}
