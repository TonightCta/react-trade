import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { UserInfoApi } from "../request/api";
import store from "../store";
import { upWSStatus } from "../store/app/action_creators";

interface WS {
    e: string,
    d: {
        symbol?: string,
        interval?: string,
        start?: number,
        end?: number,
        token?: string
    }
}

export function useUnmounted() {
    const unmountedRef = useRef(false);
    useEffect(() => {
        return () => {
            unmountedRef.current = true;
        };
    }, []);
    return unmountedRef.current;
}
/**
 * @method useAsyncState
 * Prevent React state update on an unmounted component.
 */
export function useAsyncState<S>(initialState?: S | (() => S)): [S | undefined, Dispatch<SetStateAction<S>>] {
    const unmountedRef = useUnmounted();
    const [state, setState] = useState(initialState);
    const setAsyncState = useCallback((s: any) => {
        if (unmountedRef) return;
        setState(s);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [state, setAsyncState];
}

export const listener: ((data: any) => void)[] = [];

export const addListener = (fn: any) => {
    listener.push(fn)
};

export const removeListener = (fn: any) => {
    const index = listener.indexOf(fn);
    index > -1 && listener.splice(index, 1);
}

let ws: WebSocket | null;
let count : number = 0;
let wsStatusInner: number;

export const useSocket = () => {
    const url: string = localStorage.getItem('ws_url') || '';
    const init = async (_url: string) => {

        //TODO Test
        // setInterval(() => {
        //     ws = new WebSocket(_url);
        //     ws.onopen = () => {
        //         ws?.send('{"e":"subscribe","d":{"symbol":"BBB2USDT","interval":"1m"}}');
        //         ws?.send('{"e":"login","d":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkiLCJzdWIiOiJ1c2VyIiwiZXhwIjoxODgzMzc0NjM3LCJuYmYiOjE4ODMzNzQ2MzcsImlhdCI6MTY2MjYyMjYzNywianRpIjoiMjMyNmQ5NDMtNWQ2My00ZTJkLWEwZTktN2U4MDZiY2U0MWI2IiwiaWQiOjQ2fQ.JE8JbEepmSzllke6nzftAfbURsfhFf7xy5-YpsKdAjI"}}')
        //     };
        //     ws.onmessage = (e) => {
        //         const data = JSON.parse(e.data);
        //         if (data.e === '1662375290') {
        //             console.warn(data.d.aa)
        //         }
        //     }
        // }, 150)

        if (ws) return
        ws = new WebSocket(_url);
        ws.onopen = (e: any) => {
            const action = upWSStatus(1);
            wsStatusInner = 1
            store.dispatch(action);
        };
        ws.onclose = (e: any) => {
            const action = upWSStatus(0);
            wsStatusInner = 0;
            store.dispatch(action);
            if (count > 5){
                return
            } 
            setTimeout(() => {
                ws = null;
                count ++;
                init(url);
            }, 3000)
        };
        ws!.onmessage = (e: any) => {
            listener.forEach((item: any) => {
                item(e)
            })
        }
    };
    if (url) {
        init(url);
    } else {
        UserInfoApi().then((result => {
            localStorage.setItem('ws_url', result.data.quotation.wss_url)
            init(result.data.quotation.wss_url);
        }));
    }
    const sendWs = (params: WS) => {
        wsStatusInner === 1 && ws?.send(JSON.stringify(params));
    };
    useEffect(() => {
        // init();
        return () => {
            // ws!.onclose = () => {};
            // ws!.close();
            // ws = null;
            // const action = upWSStatus(0);
            // wsStatusInner.current = 0
            // store.dispatch(action);
        }
    }, []);
    return {
        send: sendWs,
    }
}