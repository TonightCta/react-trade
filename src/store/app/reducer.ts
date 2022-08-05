import * as Type from './types';
const defaultState = {
    language: localStorage.getItem('language') || 'zh-TW',//本地语言环境
    footerStatus: sessionStorage.getItem('footerStatus') || 1,//底部导航显示状态
    invLevel: sessionStorage.getItem('invLevel') || 1,
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
        default:
            return state;
    };
};