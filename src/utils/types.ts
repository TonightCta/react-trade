

export interface WithdrawCoinMsg{
    coin:string,
    num:string | number,
    address?:string,
    fee?:number
}