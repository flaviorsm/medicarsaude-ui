export class VendaModel {
    _id: string;
    codigo: string;
    cliente: any;
    plano: any;
    vendedor: any;
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
