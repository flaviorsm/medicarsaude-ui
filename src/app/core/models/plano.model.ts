import { StatusEnum } from '@medicar/core';

export class PlanoModel {
    nome!: string;
    descricao!: string;
    valor!: number;
    status!: StatusEnum;
}
