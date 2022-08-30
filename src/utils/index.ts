import * as api from '../request/api'
interface Bal{
    balance:number[]
}
export const QuireBalance = async (_coin: string,_after_coin:string): Promise<Bal> => {
    const balance: number[] = [];
    const result = await api.UserAssetsApi();
    for (let i in result.data) {
        if (_coin === result.data[i].coin || _after_coin === result.data[i].coin) {
            balance.push(result.data[i].available);
        }
    }
    return {
        balance:balance
    }
}
//获取地址栏参数
export const GetUrlKey = (name: string, url: string): string | null => {
    return (
        decodeURIComponent(
            /* @ts-ignore */
            (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
                url
            ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
    );
};
export const DateConvert = (_time:number) : string => {
    const date = new Date(_time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const day = date.getDate();
    const hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    const min = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    const sec = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
    return `${year}/${month}/${day} ${hour}:${min}:${sec}`
}