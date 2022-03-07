import { RoleEnum, StatusEnum } from '@medicar/core';

export class UsuarioModel {
    id?: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    senha: string;
    dataNascimento?: Date;
    usuario: string;
    status?: StatusEnum;
    regra?: RoleEnum;

    constructor(model: UsuarioModel) {
        this.nome = model.nome;
        this.email = model.email;
        this.cpf = model.cpf;
        this.telefone = model.telefone;
        this.usuario = model.usuario;
        this.senha = model.senha;
        this.dataNascimento = model.dataNascimento;
    }
}
