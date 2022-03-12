import { StatusEnum } from '@medicar/core';

export class PlanoModel {
    _id?: string;
    nome!: string;
    descricao!: string;
    valor!: number;
    status!: StatusEnum;
}
