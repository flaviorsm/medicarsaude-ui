import { Util } from '../shared/util';
import { StatusEnum } from '..';

export class ClienteModel {
    id?: string;
    codigo: string;
    nome!: string;
    email!: string;
    telefone!: string;
    cpf!: string;
    rg!: string;
    dataNascimento!: Date;
    status!: StatusEnum;
    cep!: string;
    rua!: string;
    bairro!: string;
    cidade!: string;
    estado!: string;

    endereco?: any;
    pessoaFisica?: any;
    pessoa?: any;

    constructor() {
        this.codigo = Util.codigoAleatorio();
    }
}
