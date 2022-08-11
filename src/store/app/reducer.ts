import * as Type from './types';

interface UMsg {
    email?: string,
}
interface Store {
    account: UMsg,//用户信息
    assets: number,//用户资产
    appToken: string,//用户Token
    language: string,//语言
    footerStatus: number,//底部导航显示状态
    invLevel: number,//当前查看邀请等级
    currency: string,//币种队列
    loadView: number,//启动页显示状态
    currentCoin: any,//选中队列
    currentBalance: number,//USDT余额
    defaultCoin: string,
    defaultBaseCoin: string,
}
const defaultState: Store = {
    account: JSON.parse(sessionStorage.getItem('account') || '{}'),
    assets: Number(sessionStorage.getItem('assets')) || 0,
    appToken: sessionStorage.getItem('token_1') || '',//设置登录token
    language: localStorage.getItem('language') || 'zh_TW',//本地语言环境
    footerStatus: Number(localStorage.getItem('footerStatus')) || 1,//底部导航显示状态
    invLevel: Number(sessionStorage.getItem('invLevel')) || 1,//邀请等级
    currency: sessionStorage.getItem('currency') || 'BTC/USDT',//浏览币种
    loadView: Number(sessionStorage.getItem('loadView')) || 0,//启动页显示状态
    currentCoin: JSON.parse(sessionStorage.getItem('currentCoin') || '{}'),
    currentBalance: Number(sessionStorage.getItem('currentBalance')) || 0,
    defaultCoin: sessionStorage.getItem("defaultCoin") || 'BTC/USDT',
    defaultBaseCoin: sessionStorage.getItem('defaultBaseCoin') || 'BTCUSDT'
};
export default (state = defaultState, action: any) => {
    switch (action.type) {
        case Type.SET_TOKEN:
            sessionStorage.setItem('token_1', action.token);
            return { ...state, appToken: action.token }
        case Type.STE_ACCOUNT:
            sessionStorage.setItem('account', JSON.stringify(action.account));
            return { ...state, account: action.account }
        case Type.SET_ASSETS:
            sessionStorage.setItem('assets', action.assets);
            return { ...state, assets: action.assets }
        case Type.SET_LANGUAGE:
            localStorage.setItem('language', action.language);
            return { ...state, language: action.language }
        case Type.UP_FOOTER_STATUS:
            localStorage.setItem('footerStatus', action.status);
            return { ...state, footerStatus: action.status }
        case Type.UP_INV_LEVEL:
            sessionStorage.setItem('invLevel', action.level);
            return { ...state, invLevel: action.level }
        case Type.UP_CURRENCY:
            sessionStorage.setItem('currency', action.currency);
            return { ...state, currency: action.currency }
        case Type.UP_LOAD_VIEW:
            sessionStorage.setItem('loadView', action.load);
            return { ...state, loadView: action.load }
        case Type.UP_CURRENT_COIN:
            sessionStorage.setItem('currentCoin', JSON.stringify(action.currentCoin));
            return { ...state, currentCoin: action.currentCoin }
        case Type.SET_BALANCE:
            sessionStorage.setItem('currentBalance', action.balance);
            return { ...state, currentBalance: action.balance }
        case Type.DEFAULT_COIN:
            sessionStorage.setItem('defaultCoin', action.coin);
            return { ...state, defaultCoin: action.coin }
        case Type.DEFAULT_CASE_COIN:
            sessionStorage.setItem('defaultBaseCoin', action.coin);
            return { ...state, defaultBaseCoin: action.coin }
        default:
            return state;
    };
};