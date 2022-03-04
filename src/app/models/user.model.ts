import { RoleEnum } from '@medicar/shared/enums/role.enum';
import { StatusEnum } from '@medicar/shared/enums/status.enum';

export class UserModel {
    id?: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    senha: string;
    dataNascimento?: Date;
    usuario?: string;
    status?: StatusEnum;
    regra?: RoleEnum;

    constructor(model: UserModel) {
        this.nome = model.nome;
        this.email = model.email;
        this.cpf = model.cpf;
        this.telefone = model.telefone;
        this.usuario = model.usuario;
        this.senha = model.senha;
        this.dataNascimento = model.dataNascimento;
    }
}
