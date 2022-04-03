import { StatusEnum } from '..';
export class ParceiroModel {
    id?: string;
    categoria: any;
    status: StatusEnum;
    planos: string[];

    nome: string;
    email: string;
    telefone: string;

    cpf?: string;
    rg?: string;
    dataNascimento?: Date;
    CRM?: string;

    cnpj?: string;
    nomeFantasia?: string;
    IE?: string;
    dataFundacao?: Date;

    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;

    constructor(model: ParceiroModel) {
        this.categoria = model.categoria;
        this.status = model.status ?? StatusEnum.ATIVO;
        this.planos = model.planos;

        this.nome = model.nome;
        this.email = model.email;
        this.telefone = model.telefone;

        this.cpf = model.cpf;
        this.rg = model.rg;
        this.dataNascimento = model.dataNascimento;
        this.CRM = model.CRM;

        this.cnpj = model.cnpj;
        this.nomeFantasia = model.nomeFantasia;
        this.IE = model.IE;
        this.dataFundacao = model.dataFundacao;

        this.cep = model.cep;
        this.rua = model.rua;
        this.bairro = model.bairro;
        this.cidade = model.cidade;
        this.estado = model.estado;
    }
}
