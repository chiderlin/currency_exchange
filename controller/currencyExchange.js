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
    //轉換string& +千分位符號 + $ sign
    const thousandsSeparator = finalTotal.toLocaleString(undefined, {
        maximumFractionDigits: 2,
    });
    const str = `$${thousandsSeparator}`;
    console.log('final total :', str);
    return str;
}

function currencyExchangeFunc(amount, rate) {
    const finalTotal = amount * rate;
    const round = Math.round(finalTotal * 100) / 100;
    console.log('round: ', round);
    return round;
}

function amountFomatFunc(amount) {
    // 貨幣轉換, 1.錢字號跟千分位表示法要做format再轉
    const regex = /[^0-9\.]+/g;
    const amountFormat = amount.replace(regex, '');
    const amountNum = parseFloat(amountFormat);
    console.log('amount: ', amountNum);
    return amountNum;
}

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

function isTargetExistFunc(src, target) {
    const targetFormat = target.toUpperCase();
    console.log('target $: ', targetFormat);
    const isRateExist = src[targetFormat];
    console.log('rate $: ', isRateExist);
    if (!isRateExist) {
        return { status: false };
    }
    return { status: true, rate: isRateExist };
}

module.exports = {
    formatFinalTotal,
    currencyExchangeFunc,
    amountFomatFunc,
    isSourceExistFunc,
    isTargetExistFunc,
};
