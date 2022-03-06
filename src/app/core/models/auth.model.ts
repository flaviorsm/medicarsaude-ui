import { RoleEnum } from '@medicar/core';

export class AuthModel {
    userId?: string;
    username?: string;
    role?: RoleEnum;
    token?: string;
}
