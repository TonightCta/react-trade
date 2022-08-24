

export interface WithdrawCoinMsg {
    coin?: string | null,
    num?: string | number,
    address?: string,
    fee?: number,
    network?: string | number,
    min?:number
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
    q: string,
    precision?:number
}
export interface ADV {
    title: string,
    id: number,
    updated_at: string
}