import { stat } from 'fs';
import * as Type from './types';

interface UMsg {
    email?: string,
    phone: string,
    phone_prefix: string,
    avatar?: string,
    supportUrl?: string,
    security?: {
        kyc?: number,
        pay_password?: number,
        ga?: number
    },
    quotation: {
        wss_url: string
    }
}
export interface WithDraw {
    coin: string,
    num: number,
    address: string,
    fee: number
}
export interface Store {
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
    // defaultCoin: string,//交易默认队列
    // defaultCoinID: number | string,//交易默认队列ID
    // defaultBaseCoin: string,//交易默认订阅队列
    // defaultPriceCoin: number,//交易默认币种价格
    wsStatus: number,//ws服务连接状态
    kData: { second: number, type: string },
    tradeFromCoin: string,//交易From币种
    tradeToCoin: string,//交易To币种
    upLoadOrder: number,//刷新订单时机
    annID: number,//公告ID
    billCoin: string,//币种账单
    invBox: number,//邀请弹框
    withDrawMsg: WithDraw,
    homeData: any[],
    unSubscribeCoin: string,
    quList: any[],//行情
    chainMsg: { coin: string, protocol: string },//链信息
    wsSubscribe: any,//币种ws流数据
    country: string,//国家
    downApp: number,//下载状态
    tokenWSS: string,//ws登录
}
const defaultState: Store = {
    account: JSON.parse(localStorage.getItem('account') || '{}'),
    assets: Number(sessionStorage.getItem('assets')) || 0,
    appToken: localStorage.getItem('token_1') || '',//设置登录token
    language: localStorage.getItem('language') || String(process.env.REACT_APP_LANGUAGE),//本地语言环境
    footerStatus: Number(localStorage.getItem('footerStatus')) || 1,//底部导航显示状态
    invLevel: Number(sessionStorage.getItem('invLevel')) || 1,//邀请等级
    currency: sessionStorage.getItem('currency') || 'BTC/USDT',//浏览币种
    loadView: Number(sessionStorage.getItem('loadView')) || 0,//启动页显示状态
    currentCoin: JSON.parse(localStorage.getItem('currentCoin') || '{}'),
    currentBalance: Number(sessionStorage.getItem('currentBalance')) || 0,
    // defaultCoin: sessionStorage.getItem("defaultCoin") || 'BTC/USDT',
    // defaultBaseCoin: sessionStorage.getItem('defaultBaseCoin') || 'BTCUSDT',
    // defaultPriceCoin: Number(sessionStorage.getItem('defaultPriceCoin')) || 0,
    // defaultCoinID: sessionStorage.getItem('defaultCoinID') || 0,
    wsStatus: 0,//ws服务连接状态
    kData: JSON.parse(sessionStorage.getItem('kData') || '{ "second": 60, "type": "1m" }'),
    tradeFromCoin: sessionStorage.getItem('tradeFromCoin') || '',
    tradeToCoin: sessionStorage.getItem('tradeToCoin') || '',
    upLoadOrder: 0,
    annID: Number(sessionStorage.getItem('annID')) || 999,
    billCoin: sessionStorage.getItem('billCoin') || '',
    invBox: Number(sessionStorage.getItem('invBox')) || 0,
    withDrawMsg: JSON.parse(sessionStorage.getItem('withDrawMsg') || '{}'),
    homeData: JSON.parse(sessionStorage.getItem('homeData') || '[]'),//首页数据缓存
    unSubscribeCoin: sessionStorage.getItem('unSubscribeCoin') || '',//无需取消的订阅队列
    quList: JSON.parse(sessionStorage.getItem('quList') || '[]'),
    chainMsg: JSON.parse(sessionStorage.getItem('chainMsg') || '{}'),
    wsSubscribe: {},
    country: localStorage.getItem('country') || 'Philippines',
    downApp: Number(sessionStorage.getItem('downApp')) || 1,
    tokenWSS: sessionStorage.getItem('tokenWSS') || '',
};
export default (state = defaultState, action: any) => {
    switch (action.type) {
        case Type.SET_TOKEN:
            localStorage.setItem('token_1', action.token);
            return { ...state, appToken: action.token }
        case Type.STE_ACCOUNT:
            localStorage.setItem('account', JSON.stringify(action.account));
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
            localStorage.setItem('currentCoin', JSON.stringify(action.currentCoin));
            return { ...state, currentCoin: action.currentCoin }
        case Type.SET_BALANCE:
            sessionStorage.setItem('currentBalance', action.balance);
            return { ...state, currentBalance: action.balance }
        // case Type.DEFAULT_COIN:
        //     sessionStorage.setItem('defaultCoin', action.coin);
        //     return { ...state, defaultCoin: action.coin }
        // case Type.DEFAULT_COIN_ID:
        //     sessionStorage.setItem('defaultCoinID', action.id);
        //     return { ...state, defaultCoinID: action.id }
        // case Type.DEFAULT_CASE_COIN:
        //     sessionStorage.setItem('defaultBaseCoin', action.coin);
        //     return { ...state, defaultBaseCoin: action.coin }
        case Type.WS_STATUS:
            return { ...state, wsStatus: action.status }
        case Type.SET_KDATA:
            sessionStorage.setItem('kData', action.data);
            return { ...state, kData: JSON.parse(action.data) }
        case Type.SET_TRADE_FROM:
            sessionStorage.setItem('tradeFromCoin', action.coin);
            return { ...state, tradeFromCoin: action.coin }
        case Type.SET_TRADE_TO:
            sessionStorage.setItem('tradeToCoin', action.coin);
            return { ...state, tradeToCoin: action.coin }
        case Type.LOAD_ORDER:
            return { ...state, upLoadOrder: action.timestamp }
        case Type.UP_ANN_ID:
            sessionStorage.setItem('annID', action.id);
            return { ...state, annID: action.id }
        case Type.SET_BILL_COIN:
            sessionStorage.setItem('billCoin', action.coin);
            return { ...state, billCoin: action.coin }
        case Type.SET_INV_BOX:
            sessionStorage.setItem('invBox', action.status);
            return { ...state, invBox: action.status }
        case Type.UP_WITHDRAW:
            sessionStorage.setItem('withDrawMsg', JSON.stringify(action.msg));
            return { ...state, withDrawMsg: action.msg }
        case Type.SET_HOME_DATA:
            sessionStorage.setItem('homeData', JSON.stringify(action.data));
            return { ...state, homeData: action.data }
        case Type.SET_UN_COIN:
            sessionStorage.setItem('unSubscribeCoin', action.coin);
            return { ...state, unSubscribeCoin: action.coin }
        // case Type.DEFAULT_PRICE_COIN:
        //     sessionStorage.setItem('defaultPriceCoin', action.price);
        //     return { ...state, defaultPriceCoin: action.price }
        case Type.SET_QU:
            sessionStorage.setItem('quList', JSON.stringify(action.qu));
            return { ...state, quList: action.qu }
        case Type.SET_CHAIN_MSG:
            sessionStorage.setItem('chainMsg', JSON.stringify(action.msg));
            return { ...state, chainMsg: action.msg }
        case Type.SET_WSS_SUBSCRIBE:
            // localStorage.setItem('wsSubscribe',JSON.stringify(action.data));
            return { ...state, action: action.data }
        case Type.UP_COUNTRY:
            localStorage.setItem('country', action.country);
            return { ...state, country: action.country }
        case Type.DOWN_APP:
            sessionStorage.setItem('downApp', action.down);
            return { ...state, downApp: action.down }
        case Type.WSS_TOKEN:
            sessionStorage.setItem('tokenWSS', action.token);
            return { ...state, tokenWSS: action.token }
        default:
            return state;
    };
};