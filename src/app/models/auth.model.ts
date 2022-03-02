import { RoleEnum } from '@medicar/shared/enums/role.enum';

export class AuthModel {
    userId?: string;
    username?: string;
    role?: RoleEnum;
    token?: string;
}
