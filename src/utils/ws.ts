import { UserInfoApi } from "../request/api";

interface WS {
    e: string,
    d: {
        symbol: string,
        interval?: string,
        start?: number,
        end?: number
    }
}

let ws: any;

export const createWS = async () => {
    const result = await UserInfoApi();
    ws = new WebSocket(result.data.quotation.wss_url);
    // ws.onclose = reconnect();
};
export const sendWs = (params: WS) => {
    ws?.send(JSON.stringify(params))
};

export const getMessage = () => {
    return {
        message: ws
    };
};

export const reconnect = () => {
    // setTimeout(() => {
    //     ws = null;
    //     createWS();
    // }, 3000)
}


