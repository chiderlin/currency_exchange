import {
    Rate,
    SrcFormatInterface,
    srcObjInterface,
    rateObjInterface,
} from '../interface';

const rate: Rate = {
    currencies: {
        TWD: {
            TWD: 1,
            JPY: 3.669,
            USD: 0.03281,
        },
        JPY: {
            TWD: 0.26956,
            JPY: 1,
            USD: 0.00885,
        },
        USD: {
            TWD: 30.444,
            JPY: 111.801,
            USD: 1,
        },
    },
};

export function formatFinalTotal(finalTotal: number): string {
    const thousandsSeparator: string = finalTotal.toLocaleString(undefined, {
        maximumFractionDigits: 2,
    });
    const str: string = `$${thousandsSeparator}`;
    console.log('final total :', str);
    return str;
}

export function currencyExchangeFunc(amount: number, rate: number): number {
    const finalTotal: number = amount * rate;
    const round: number = Math.round(finalTotal * 100) / 100;
    console.log('round: ', round);
    return round;
}

export function amountFormatFunc(amount: any): number {
    const regex = /[^0-9\.]+/g;
    const amountFormat: string = amount.replace(regex, '');
    const amountNum: number = parseFloat(amountFormat);
    console.log('amount: ', amountNum);
    return amountNum;
}

export function isSourceExistFunc(src: any): SrcFormatInterface {
    const srcFormat: string = src.toUpperCase();
    console.log('source $: ', srcFormat);
    const sourceObj: srcObjInterface = rate.currencies[srcFormat];
    console.log('source object $: ', sourceObj);
    if (!sourceObj) {
        return { status: false };
    }
    return { status: true, data: sourceObj };
}

export function isTargetExistFunc(srcObj: any, target: any): rateObjInterface {
    const targetFormat = target.toUpperCase();
    console.log('target $: ', targetFormat);
    const isRateExist = srcObj[targetFormat];
    console.log('rate $: ', isRateExist);
    if (!isRateExist) {
        return { status: false };
    }
    return { status: true, rate: isRateExist };
}
