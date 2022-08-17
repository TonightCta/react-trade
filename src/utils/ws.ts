import { UserInfoApi } from "../request/api";
import store from "../store";
import { upWSStatus } from "../store/app/action_creators";

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
let wsStatusInner: number = 0;

export const createWS = async () => {
    const result = await UserInfoApi();
    // result.data.quotation.wss_url
    ws = new WebSocket(result.data.quotation.wss_url);
    ws.onopen = (e: any) => {
        const action = upWSStatus(1);
        wsStatusInner = 1;
        store.dispatch(action);
    };
    ws.onclose = (e: any) => {
        const action = upWSStatus(0);
        store.dispatch(action);
        wsStatusInner = 0;
        if (wsStatusInner === 0) {
            setTimeout(() => {
                ws = null;
                createWS();
            }, 3000)
        } else {
            wsStatusInner = 1;
        }
    };

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
    // if()
    const webs = setInterval(() => {
        const action = upWSStatus(0);
        store.dispatch(action);
        if (store.getState().wsStatus === 0) {
            console.log('开始重连')
            createWS();
        } else {
            console.log('重连成功')
            clearInterval(webs)
        }
    }, 3000);
    // setTimeout(() => {
    //     ws = null;
    //     createWS();
    // }, 3000)
}


