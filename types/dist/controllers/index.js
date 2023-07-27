"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const currencyExchange_1 = require("./currencyExchange");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { source, target, amount } = req.query;
        if (!source)
            return res
                .status(400)
                .json({ msg: 'error', data: 'source required.' });
        if (!target)
            return res
                .status(400)
                .json({ msg: 'error', data: 'target required.' });
        if (!amount)
            return res
                .status(400)
                .json({ msg: 'error', data: 'amount required.' });
        // 判斷source在不在
        const sourceFormat = (0, currencyExchange_1.isSourceExistFunc)(source);
        const isSourceExist = sourceFormat.status;
        if (!isSourceExist)
            return res.status(400).json({
                msg: 'error',
                data: 'source currency does not exist.',
            });
        // 判斷target在不在
        const srcObj = sourceFormat.data;
        const targetFormat = (0, currencyExchange_1.isTargetExistFunc)(srcObj, target);
        const isTargetExist = targetFormat.status;
        if (!isTargetExist)
            return res.status(400).json({
                msg: 'error',
                data: 'target currency does not exist.',
            });
        const amountFormat = (0, currencyExchange_1.amountFormatFunc)(amount);
        const rate = targetFormat.rate;
        const currencyExchange = (0, currencyExchange_1.currencyExchangeFunc)(amountFormat, rate);
        const totalString = (0, currencyExchange_1.formatFinalTotal)(currencyExchange);
        console.log('---currency exchange success---');
        return res.json({ msg: 'success', amount: totalString });
    }
    catch (e) {
        console.log('Throw error: ', e);
        if (e instanceof Error) {
            return res.status(400).json({ msg: 'error', data: e.message });
        }
        return res.status(400).json({ msg: 'error', data: 'uncatch error' });
    }
});
