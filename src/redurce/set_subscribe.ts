

import { IState,IAction,WSDataType } from "../utils/state";

export const initWsSubscribe = (wsSubscribe:any) => {
   return { wsSubscribe }
};

export const subscribeReducer = (state:IState,action:IAction) => {
    const { type,payload } = action;
    switch(type){
        case WSDataType.SET_WSS_SUBSCRIBE:
            return{
                ...state,
                wsSubscribe:payload.wsSubscribe
            }
         default:
            return state
    }
};

export default {
    initWsSubscribe,
    subscribeReducer,
}