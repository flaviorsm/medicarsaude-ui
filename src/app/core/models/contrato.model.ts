import { PagamentoModel, PlanoModel, StatusEnum, VendaModel } from '@medicar/core';

export class ContratoModel {
    id?: string;
    codigo!: string;
    status!: StatusEnum;
    plano?: PlanoModel | string;
    venda?: VendaModel | string;
    pagamentos?: PagamentoModel[];
}
