import { StringHashMap } from './type';

const formatToRegExp: StringHashMap<RegExp> = {
    0: /[0-9]/, a: /[a-z]/, A: /[A-Z]/, B: /[a-zA-Z]/,
};

const allFormatsStr = '(' +
    Object.keys(formatToRegExp)
        .map(key => formatToRegExp[key].toString())
        .map(regexStr => regexStr.substr(1, regexStr.length - 2))
        .join('|')
    + ')';

const allFormatsGlobal = getAllFormatRegexp('g');

/**
 * Aplicar formato a uma string de valor
 *
 * O formato pode ser construído a partir dos seguintes símbolos:
 *  - '0': /[0-9]/,
 *  - 'a': /[a-z]/,
 *  - 'A': /[A-Z]/,
 *  - 'B': /[a-zA-Z]/
 *
 * Exemplo: 'AAA-00BB-aaaa'
 * Aceita: 'COD-12Rt-efww'
 *
 * @param value Valor atual
 * @param format Formato
 * @param goingBack Indica se a alteração foi feita pelo BackSpace
 * @param prevValue Passe para detectar precisamente os caracteres do formatador
 */
export function valueToFormat(value: string, format: string, goingBack = false, prevValue?: string): string {
    let maskedValue = '';
    const unmaskedValue = unmaskValue(value);
    const isLastCharFormatter = !getAllFormatRegexp().test(value[value.length - 1]);
    const isPrevLastCharFormatter = prevValue && !getAllFormatRegexp().test(prevValue[prevValue.length - 1]);

    let formatOffset = 0;
    for (let i = 0, maxI = Math.min(unmaskedValue.length, format.length); i < maxI; ++i) {
        const valueChar = unmaskedValue[i];
        let formatChar = format[formatOffset + i];
        let formatRegex = getFormatRegexp(formatChar);

        if (formatChar && !formatRegex) {
            maskedValue += formatChar;
            formatChar = format[++formatOffset + i];
            formatRegex = getFormatRegexp(formatChar);
        }

        if (valueChar && formatRegex) {
            if (formatRegex.test(valueChar)) {
                maskedValue += valueChar;
            } else {
                break;
            }
        }

        const nextFormatChar = format[formatOffset + i + 1];
        const nextFormatRegex = getFormatRegexp(nextFormatChar);
        const isLastIteration = i === maxI - 1;

        if (isLastIteration && nextFormatChar && !nextFormatRegex) {
            if (!isLastCharFormatter && goingBack) {
                if (prevValue && !isPrevLastCharFormatter) {
                    continue;
                }
                maskedValue = maskedValue.substr(0, formatOffset + i);
            } else {
                maskedValue += nextFormatChar;
            }
        }
    }

    return maskedValue;
}

export function unmaskValue(value: string): string {
    const unmaskedMathes = value.match(allFormatsGlobal);
    return unmaskedMathes ? unmaskedMathes.join('') : '';
}

function getAllFormatRegexp(flags?: string): any {
    return new RegExp(allFormatsStr, flags);
}

function getFormatRegexp(formatChar: string): RegExp | null {
    return formatChar && formatToRegExp[formatChar] ? formatToRegExp[formatChar] : null;
}


