import React, { ReactNode, useEffect, useRef, useState } from "react";
import TradeNav from "./components/trade_nav";
import TradeOper from "./components/trade_oper";
import TradeOrder from "./components/trade_order";
import './index.scss';
import { upFooterStatus } from "../../store/app/action_creators";
import store from "../../store";
import { useTranslation } from "react-i18next";
import { sendWs, getMessage } from "../../utils/ws";
import LoadData from "../quotes/tes_detail/components/load_data";

interface Coin {
    coin: string,
    base: string
}
interface Depch {
    Price: number | string,
    Quantity: number | string,
}


const TradeIndex = (): React.ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [coinPrice, setCoinPrice] = useState<number>(0);
    const test = useRef(null);
    // ws服务连接状态
    const [wsStatus, setWsStatus] = useState<number>(store.getState().wsStatus)
    const [coinMsg, setCoinMsg] = useState<Coin>({
        coin: store.getState().defaultCoin,
        base: store.getState().defaultBaseCoin
    });
    store.subscribe(() => {
        setCoinMsg({
            coin: store.getState().defaultCoin,
            base: store.getState().defaultBaseCoin
        });
        setCoinPrice(0);
        setWsStatus(store.getState().wsStatus)
    });
    const [sellQUList, setSellQUlist] = useState<Depch[]>([]);
    const [buyQUList, setBuyQUList] = useState<Depch[]>([]);
    const sendSub = () => {
        setTimeout(() => {
            sendWs({
                e: 'subscribe',
                d: {
                    symbol: coinMsg.base,
                    interval: "1m"
                }
            });
            sendWs({
                e: 'subscribe-depth',
                d: {
                    symbol: coinMsg.base,
                }
            });
            getMessage().message.onmessage = (e: any) => {
                const data = JSON.parse(e.data);
                if (data.e === "subscribe") {
                    setCoinPrice(Number(data.k.c))
                };
                if (data.e === 'subscribe-depth') {
                    setBuyQUList(data.d.asks);
                    setSellQUlist(data.d.bids);
                }
            }
        }, 1500)
    };
    useEffect(() => {
        wsStatus === 1 && sendSub();
    }, [wsStatus]);
    const unSendWS = () => {
        sendWs({
            e: 'unsubscribe',
            d: {
                symbol: coinMsg.base,
                interval: "1m"
            }
        });
        sendWs({
            e: 'unsubscribe-depth',
            d: {
                symbol: coinMsg.base,
                interval: "1m"
            }
        });
    }
    useEffect(() => {
        const action = upFooterStatus(1);
        store.dispatch(action);
        return () => {
            unSendWS();
        }
    }, []);
    return (
        <div className="trade-index">
            {/* 导航信息 */}
            <TradeNav coinMsg={coinMsg} t={t} />
            {/* 交易模块 */}
            <TradeOper reloadOrder={() => {
                console.log(test)
            }} t={t} sellQUList={sellQUList} buyQUList={buyQUList} coinPrice={coinPrice} />
            {/* 订单信息 */}
            <TradeOrder t={t} />
            {coinPrice === 0 && <LoadData />}
        </div>
    )
};

export default TradeIndex;