import { ContratoModel } from './contrato.model';
import { StatusPagamentoEnum } from '../enums/status-pagamento.enum';
import { Util } from '../shared/util';

export class VendaModel {
    id?: string;
    codigo?: string;
    cliente: any;
    plano: any;
    vendedor: any;
    dataVenda: Date;
    statusPagamento: StatusPagamentoEnum;
    contrato?: ContratoModel;

    constructor(model: VendaModel) {
        this.codigo = model.codigo ?? Util.codigoAleatorio();
        this.cliente = model.cliente;
        this.plano = model.plano;
        this.vendedor = model.vendedor;
        this.dataVenda = model.dataVenda;
        this.statusPagamento = model.statusPagamento;
    }
}
