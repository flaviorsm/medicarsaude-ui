import { Util } from '../shared/util';
import { StatusEnum } from '..';

export class ClienteModel {
    id?: string;
    codigo?: string;
    nome!: string;
    email!: string;
    telefone!: string;
    cpf!: string;
    dataNascimento!: Date;
    status!: StatusEnum;
    cep!: string;
    rua!: string;
    bairro!: string;
    cidade!: string;
    estado!: string;

    constructor(model: ClienteModel) {
        this.codigo = model.codigo ?? Util.codigoAleatorio();
        this.status = model.status ?? StatusEnum.ATIVO;
        this.nome = model.nome;
        this.email = model.email;
        this.telefone = model.telefone;
        this.cpf = model.cpf;
        this.dataNascimento = model.dataNascimento;
        this.cep = model.cep;
        this.rua = model.rua;
        this.bairro = model.bairro;
        this.cidade = model.cidade;
        this.estado = model.estado;
    }
}
