import { StatusEnum } from '..';
import { Util } from '@medicar/core/shared/util';
export class ColaboradorModel {
    id?: string;
    codigo: string;
    status!: StatusEnum;
    funcao!: string;
    dataContratacao!: Date;
    ctps!: string;
    usuario!: boolean;
    nome!: string;
    email!: string;
    telefone!: string;
    cpf!: string;
    rg!: string;
    dataNascimento!: Date;
    cep!: string;
    rua!: string;
    bairro!: string;
    cidade!: string;
    estado!: string;

    constructor(codigo?: string) {
        this.codigo = codigo ?? Util.codigoAleatorio();
    }
}
