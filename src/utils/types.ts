

export interface WithdrawCoinMsg {
    coin?: string | null,
    num?: string | number,
    address?: string,
    fee?: number,
    network?: string | number,
    min?: number,
    channel_id?: number,
    channel_id_parent?: number,
    card_name?: string,
    card_num?: number,
    bank_name?:string,
    fiat_rate?:number
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
    precision?: number
}
export declare interface ADV {
    title: string,
    id: number,
    updated_at: string,
    created_at: string
}