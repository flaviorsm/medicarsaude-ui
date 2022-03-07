export class VendaModel {
    _id: string;
    codigo: string;
    cliente: string;
    plano: string;
    vendedor: string;
    dataVenda: Date;

    constructor() {
        this._id = '';
        this.codigo = '';
        this.cliente = '';
        this.plano = '';
        this.vendedor = '';
        this.dataVenda = {} as Date;
    }
}
