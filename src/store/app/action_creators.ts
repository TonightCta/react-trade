import * as Type from "./types";
//设置Token
export const setToken = (token:string) => ({
    type:Type.SET_TOKEN,
    token
})
//设置用户信息
export const setAccount = (account:{}) => ({
    type:Type.STE_ACCOUNT,
    account
})
//设置用户资产
export const setAssets = (assets:number) => ({
    type:Type.SET_ASSETS,
    assets
})
//更新启动页显示状态
export const setLoadView = (load:number) => ({
    type:Type.UP_LOAD_VIEW,
    load
})
//设置语言
export const setLanguage = (language:string) => ({
    type:Type.SET_LANGUAGE,
    language
})
//更新底部导航显示状态
export const upFooterStatus = (status: number) => ({
    type: Type.UP_FOOTER_STATUS,
    status
});
//更新邀请查看等级
export const upInvLevel = (level:number) => ({
    type:Type.UP_INV_LEVEL,
    level
});
//更新币种队列
export const upCurrency = (currency:string) => ({
    type:Type.UP_CURRENCY,
    currency
});
//更新币种队列信息
export const upCurrentCoin = (currentCoin:{}) => ({
    type:Type.UP_CURRENT_COIN,
    currentCoin
})


