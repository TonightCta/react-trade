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