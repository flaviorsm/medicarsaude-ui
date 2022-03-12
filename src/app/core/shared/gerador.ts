export class Gerador {

    static codigoAleatorio(qtdLetas: number = 3): string {

        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVYWXZ';
        let first = '';
        for (let i = 0; i < qtdLetas; i++) {
            first += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        const last = Math.random() * (1000 - 9999) + 1000;

        return `${first}-${last}`;
    }
}
