export class PagamentoModel {
    id?: string;
    codigo!: string;
    referencia!: Date;
    valorPago!: number;
    dataVencimento!: Date;
    dataPagamento?: Date;
    status!: number;
    contrato!: string;
}
