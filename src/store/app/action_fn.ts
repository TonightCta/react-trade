import store from '..';
import * as api from '../../request/api';
import { setAccount, setAssets, setBalance } from './action_creators';
import { IResponse } from '../../utils/types';

//更新用户信息
export const upUserInfo = async (): Promise<IResponse> => {
    const result = await api.UserInfoApi();
    const { code } = result;
    if (code === 200) {
        const action = setAccount(result.data);
        store.dispatch(action);
    };
    return result;
};
//更新用户资产
export const upUserAssets = async (): Promise<void> => {
    //10s 刷新
    const result = await api.UserAssetsApi();
    const QResult = await api.QUList();
    let assets = [];
    for (let i in result.data) {
        if (i !== 'USDT') {
            assets.push(result.data[i])
        }
    };
    const val = assets.map((item) => {
        return item.available * (QResult.data.list[item.symbol] && QResult.data.list[item.symbol].price)
    });
    const num = val.reduce((prev, curr) => { return prev + curr }) + result.data['USDT'].available;
    const action = setAssets(num.toFixed(4));
    const balance = setBalance(result.data['USDT'].available);
    store.dispatch(action);
    store.dispatch(balance);
}
//更新用户资产
export const computedAssets = async (_assets:any) : Promise<number> => {
    //10s 刷新
    const QResult = await api.QUList();
    let assets:any[]  = [];
    for (let i in _assets) {
        if (i !== 'USDT') {
            assets.push({
                symbol:`${i}USDT`,
                amount:_assets[i]
            })
        }
    };
    const quteos = QResult.data.list;
    const val = assets.map((item) => {
        return item.amount * (quteos[item.symbol] && quteos[item.symbol].price)
    });
    const num : number = val.length === 0 ? Number(_assets['USDT']) : val.reduce((prev, curr) => { return prev + curr }) + _assets['USDT'];
    return num;
}

