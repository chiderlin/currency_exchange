"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTargetExistFunc = exports.isSourceExistFunc = exports.amountFormatFunc = exports.currencyExchangeFunc = exports.formatFinalTotal = void 0;
const rate = {
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
function formatFinalTotal(finalTotal) {
    const thousandsSeparator = finalTotal.toLocaleString(undefined, {
        maximumFractionDigits: 2,
    });
    const str = `$${thousandsSeparator}`;
    console.log('final total :', str);
    return str;
}
exports.formatFinalTotal = formatFinalTotal;
function currencyExchangeFunc(amount, rate) {
    const finalTotal = amount * rate;
    const round = Math.round(finalTotal * 100) / 100;
    console.log('round: ', round);
    return round;
}
exports.currencyExchangeFunc = currencyExchangeFunc;
function amountFormatFunc(amount) {
    const regex = /[^0-9\.]+/g;
    const amountFormat = amount.replace(regex, '');
    const amountNum = parseFloat(amountFormat);
    console.log('amount: ', amountNum);
    return amountNum;
}
exports.amountFormatFunc = amountFormatFunc;
function isSourceExistFunc(src) {
    const srcFormat = src.toUpperCase();
    console.log('source $: ', srcFormat);
    const sourceObj = rate.currencies[srcFormat];
    console.log('source object $: ', sourceObj);
    if (!sourceObj) {
        return { status: false };
    }
    return { status: true, data: sourceObj };
}
exports.isSourceExistFunc = isSourceExistFunc;
function isTargetExistFunc(srcObj, target) {
    const targetFormat = target.toUpperCase();
    console.log('target $: ', targetFormat);
    const isRateExist = srcObj[targetFormat];
    console.log('rate $: ', isRateExist);
    if (!isRateExist) {
        return { status: false };
    }
    return { status: true, rate: isRateExist };
}
exports.isTargetExistFunc = isTargetExistFunc;
