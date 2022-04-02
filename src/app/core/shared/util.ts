import { AuthModel } from './../models/auth.model';
import { StatusEnum } from './../enums/status.enum';
import { StatusPagamentoEnum } from './../enums/status-pagamento.enum';
import { RoleEnum } from '../enums/role.enum';
import { environment } from '@environments/environment';

export class Util {

    static textoStatusPagamentoEnumConfig(index: number): any {
        const status = StatusPagamentoEnum[index].toString().toLowerCase();
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    static textoStatusEnumConfig(index: number): any {
        const status = StatusEnum[index].toString().toLowerCase();
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    static codigoAleatorio(qtdLetas: number = 3): string {

        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVYWXZ';
        let first = '';
        for (let i = 0; i < qtdLetas; i++) {
            first += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        const last = Math.floor(Math.random() * 9000 + 999);

        return `${first}-${last}`;
    }

    static formataData(data: Date): string {
        const d = new Date(data);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    static hasPermission(rolesRoute: number[]): boolean {
        const authStorage = localStorage.getItem(environment.sessionStorage);
        if (authStorage) {
            const roleUser: AuthModel = JSON.parse(authStorage);
            return rolesRoute.includes(roleUser.role);
        }
        return false;
    }
}
