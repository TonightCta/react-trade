

export interface WithdrawCoinMsg {
    coin?: string,
    num?: string | number,
    address?: string,
    fee?: number,
    network?: string | number
}

export interface IResponse {
    code: string | number,
    data: any,
    message: string
}

export interface DealMsg {
    dc: string,
    dt: number,
    p: string,
    q: string
}
export interface ADV {
    title: string,
    id: number,
    updated_at: string
}