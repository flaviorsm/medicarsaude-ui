import { StatusEnum } from '@medicar/core';

export class ContratoModel {
    codigo!: string;
    status!: StatusEnum;
    plano!: string;
    cliente!: string;
    vendedor!: string;
}
