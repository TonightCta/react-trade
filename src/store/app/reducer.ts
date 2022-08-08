import * as Type from './types';

interface Store {
    language:string,//语言
    footerStatus:number,//底部导航显示状态
    invLevel:number,//当前查看邀请等级
    currency:string,//币种队列
    loadView:number,//启动页显示状态
}
const defaultState : Store = {
    language: localStorage.getItem('language') || 'zh-TW',//本地语言环境
    footerStatus: Number(sessionStorage.getItem('footerStatus')) || 1,//底部导航显示状态
    invLevel: Number(sessionStorage.getItem('invLevel')) || 1,//邀请等级
    currency: sessionStorage.getItem('currency') || 'BTC/USDT',//浏览币种
    loadView:Number(sessionStorage.getItem('loadView')) || 0,//启动页显示状态
};
export default (state = defaultState, action: any) => {
    switch (action.type) {
        case Type.SET_LANGUAGE:
            localStorage.setItem('language', action.language);
            return { ...state, language: action.language }
        case Type.UP_FOOTER_STATUS:
            sessionStorage.setItem('footerStatus', action.status);
            return { ...state, footerStatus: action.status }
        case Type.UP_INV_LEVEL:
            sessionStorage.setItem('invLevel', action.level);
            return { ...state, invLevel: action.level }
        case Type.UP_CURRENCY:
            sessionStorage.setItem('currency', action.currency);
            return { ...state, currency: action.currency }
        case Type.UP_LOAD_VIEW:
            sessionStorage.setItem('loadView',action.load);
            return { ...state,loadView:action.load }
        default:
            return state;
    };
};