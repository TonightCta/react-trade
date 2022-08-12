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
});
//设置默认余额
export const setBalance = (balance:number) => ({
    type:Type.SET_BALANCE,
    balance
});
//设置币种
export const upDefaultCoin = (coin:string) => ({
    type:Type.DEFAULT_COIN,
    coin
});
//设置订阅币种
export const upDefaultBaseCoin = (coin:string) => ({
    type:Type.DEFAULT_CASE_COIN,
    coin
});
//设置ws服务连接状态
export const upWSStatus = (status:number) => ({
    type:Type.WS_STATUS,
    status
});
//设置k选筛选
export const setKData = (data:string) => ({
    type:Type.SET_KDATA,
    data
});
//设置交易From币种
export const setTradeFrom = (coin:string) => ({
    type:Type.SET_TRADE_FROM,
    coin
})
//设置交易To币种
export const setTradeTo = (coin:string) => ({
    type:Type.SET_TRADE_TO,
    coin
})


