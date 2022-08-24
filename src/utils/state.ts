
export interface IState{
    wsSubscribe?:any,
    wsKLine?:any
};

export interface IAction{
    type:WSDataType,
    payload:IState
}

export enum WSDataType{
    SET_WSS_SUBSCRIBE = 'set_wss_subscribe',
    SET_WSS_KLINE = 'set_wss_kline'
}