import { StatusEnum } from '..';
import { Util } from '@medicar/core/shared/util';
export class ColaboradorModel {
    id?: string;
    codigo: string | undefined;
    status: StatusEnum;
    funcao: string;
    dataContratacao: Date;
    ctps: string;
    usuario: boolean;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    rg: string;
    dataNascimento: Date;
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;

    constructor(model: ColaboradorModel) {
        this.codigo = model.codigo ?? Util.codigoAleatorio();
        this.status = model.status ?? StatusEnum.ATIVO;
        this.funcao = model.funcao;
        this.dataContratacao = model.dataContratacao;
        this.ctps = model.ctps;
        this.usuario = model.usuario;
        this.nome = model.nome;
        this.email = model.email;
        this.telefone = model.telefone;
        this.cpf = model.cpf;
        this.rg = model.rg;
        this.dataNascimento = model.dataNascimento;
        this.cep = model.cep;
        this.rua = model.rua;
        this.bairro = model.bairro;
        this.cidade = model.cidade;
        this.estado = model.estado;
    }
}
