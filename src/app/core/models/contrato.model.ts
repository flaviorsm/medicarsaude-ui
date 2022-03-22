import { PagamentoModel, PlanoModel, StatusEnum, VendaModel } from '@medicar/core';

export class ContratoModel {
    id?: string;
    codigo!: string;
    status!: StatusEnum;
    plano?: any;
    venda?: any;
    pagamentos?: PagamentoModel[];
}
