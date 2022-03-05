import { RoleEnum } from '@medicar/shared';

export class AuthModel {
    userId?: string;
    username?: string;
    role?: RoleEnum;
    token?: string;
}
