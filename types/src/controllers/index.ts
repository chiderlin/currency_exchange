import {
    formatFinalTotal,
    currencyExchangeFunc,
    amountFormatFunc,
    isSourceExistFunc,
    isTargetExistFunc,
} from './currencyExchange';
import { Request, Response } from 'express';
import { SrcFormatInterface, rateObjInterface } from '../interface';
export default async (req: Request, res: Response) => {
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
        const sourceFormat = isSourceExistFunc(source) as SrcFormatInterface;
        const isSourceExist = sourceFormat.status;
        if (!isSourceExist)
            return res.status(400).json({
                msg: 'error',
                data: 'source currency does not exist.',
            });

        // 判斷target在不在
        const srcObj = sourceFormat.data;
        const targetFormat = isTargetExistFunc(
            srcObj,
            target
        ) as rateObjInterface;
        const isTargetExist = targetFormat.status;
        if (!isTargetExist)
            return res.status(400).json({
                msg: 'error',
                data: 'target currency does not exist.',
            });
        const amountFormat = amountFormatFunc(amount) as number;
        const rate = targetFormat.rate as number;
        const currencyExchange = currencyExchangeFunc(amountFormat, rate);
        const totalString = formatFinalTotal(currencyExchange);
        console.log('---currency exchange success---');
        return res.json({ msg: 'success', amount: totalString });
    } catch (e) {
        console.log('Throw error: ', e);
        if (e instanceof Error) {
            return res.status(400).json({ msg: 'error', data: e.message });
        }
        return res.status(400).json({ msg: 'error', data: 'uncatch error' });
    }
};
