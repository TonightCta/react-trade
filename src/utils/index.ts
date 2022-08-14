import * as api from '../request/api'
export const QuireBalance = async (_coin: string): Promise<number> => {
    let balance: number = 1;
    const result = await api.UserAssetsApi();
    for (let i in result.data) {
        if (_coin === result.data[i].coin) {
            balance = result.data[i].available;
        }
    }
    return balance
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
}