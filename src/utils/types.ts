

export interface WithdrawCoinMsg {
    coin?: string,
    num?: string | number,
    address?: string,
    fee?: number
}

export interface IResponse {
    code: string | number,
    data: any,
    message: string
}

export interface DealMsg{
    dc:string,
    dt:number,
    p:string,
    q:string
}