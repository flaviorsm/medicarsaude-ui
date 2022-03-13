import { StatusEnum } from '@medicar/core';

export class PlanoModel {
    id?: string;
    nome!: string;
    descricao!: string;
    valor!: number;
    status!: StatusEnum;
}
