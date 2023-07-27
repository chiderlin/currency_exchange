const {
    isSourceExistFunc,
    isTargetExistFunc,
    amountFomatFunc,
    currencyExchangeFunc,
    formatFinalTotal,
} = require('../controller/currencyExchange');
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

describe('test with isSourceExistFunc function', () => {
    it('get source object', () => {
        const src = 'twd';
        const predictValue = {
            status: true,
            data: rate.currencies[src.toUpperCase()],
        };

        expect(isSourceExistFunc(src)).toMatchObject(predictValue);
    });

    it('do not get source obj', () => {
        const src = 'aaa';
        const predictValue = {
            status: false,
        };
        expect(isSourceExistFunc(src)).toMatchObject(predictValue);
    });
});

describe('test isTargetExistFunc function', () => {
    it('get rate', () => {
        const srcCurrency = 'USD';
        const srcObj = jest.fn(() => rate.currencies[srcCurrency]);
        // console.log('srcObj', srcObj());
        const target = 'twd';
        const predictValue = {
            status: true,
            rate: rate.currencies[srcCurrency][target.toUpperCase()],
        };
        expect(isTargetExistFunc(srcObj(), target)).toMatchObject(predictValue);
    });

    it('do not get rate', () => {
        const srcCurrency = 'USD';
        const srcObj = jest.fn(() => rate.currencies[srcCurrency]);
        const target = 'bbb';
        const predictValue = { status: false };
        expect(isTargetExistFunc(srcObj(), target)).toMatchObject(predictValue);
    });
});

describe('test amountFormatFunc function', () => {
    it('test amount normal insert', () => {
        const amount = '$123,456';
        expect(amountFomatFunc(amount)).toBe(123456);
    });

    it('test float insert', () => {
        const amount = '$123,456.1233333';
        expect(amountFomatFunc(amount)).toBe(123456.1233333);
    });

    it('test random insert', () => {
        const amount = '$rrr1t2^3';
        expect(amountFomatFunc(amount)).toBe(123);
    });
});

describe('test currencyExchangeFunc function', () => {
    it('return total amount after exchange and second decimal place', () => {
        const amount = 12;
        const rate = 30.444;
        expect(currencyExchangeFunc(amount, rate)).toBe(365.33);
    });
});

describe('test formatFinalTotal function', () => {
    it('send Int to return format type of string', () => {
        const finalTotal = 12355;
        expect(formatFinalTotal(finalTotal)).toBe('$12,355');
    });

    it('send float teturn format type of string', () => {
        const finalTotal = 12355.32;
        expect(formatFinalTotal(finalTotal)).toBe('$12,355.32');
    });

    it('send float return second decimal place with format type of string', () => {
        const finalTotal = 12355.333333;
        expect(formatFinalTotal(finalTotal)).toBe('$12,355.33');
    });
});
