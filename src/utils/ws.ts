// import { UserInfoApi } from "../request/api";
// import store from "../store";
// import { setWSSData, upWSStatus } from "../store/app/action_creators";

// interface WS {
//     e: string,
//     d: {
//         symbol: string,
//         interval?: string,
//         start?: number,
//         end?: number
//     }
// }

// let ws: any;
// let wsStatusInner: number = 0;
// export let wsMessage: any = null;

// export const createWS = async () => {
//     const result = await UserInfoApi();
//     // result.data.quotation.wss_url
//     ws = new WebSocket(result.data.quotation.wss_url);
//     ws.onopen = (e: any) => {
//         const action = upWSStatus(1);
//         wsStatusInner = 1;
//         store.dispatch(action);
//     };
//     ws.onclose = (e: any) => {
//         const action = upWSStatus(0);
//         store.dispatch(action);
//         wsStatusInner = 0;
//         if (wsStatusInner === 0) {
//             setTimeout(() => {
//                 ws = null;
//                 createWS();
//             }, 3000)
//         } else {
//             wsStatusInner = 1;
//         }
//     };
//     // wsMessage = ws.onmessage;
//     // ws.onmessage = (e: any) => {
//     //     const data = JSON.parse(e.data);
//     //     if (data.e === 'subscribe') {
//     //         const action = setWSSData(data);
//     //         store.dispatch(action)
//     //     }
//     // }

// };
// export const sendWs = (params: WS) => {
//     ws?.send(JSON.stringify(params))
// };

// export const getMessage = () => {
//     return {
//         message: ws
//     };
// };

export default {}