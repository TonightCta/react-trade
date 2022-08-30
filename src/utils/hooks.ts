import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
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
let wsStatusInner: number;

export const useSocket = () => {
    let init: () => void;
    UserInfoApi().then((result => {
        init = async () => {
            if (ws) return
            ws = new WebSocket(result.data.quotation.wss_url);
            ws.onopen = (e: any) => {
                const action = upWSStatus(1);
                wsStatusInner = 1
                store.dispatch(action);
            };
            ws.onclose = (e: any) => {
                const action = upWSStatus(0);
                wsStatusInner = 0;
                store.dispatch(action);
                setTimeout(() => {
                    ws = null;
                    init();
                }, 3000)
            };
            ws!.onmessage = (e: any) => {
                listener.forEach((item: any) => {
                    item(e)
                })
            }
        };
        init();
    }))
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