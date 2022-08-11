import React, { ReactNode, useEffect, useState } from "react";
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

const TradeIndex = (): React.ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [coinPrice, setCoinPrice] = useState<number>(0);
    const [coinMsg, setCoinMsg] = useState<Coin>({
        coin: store.getState().defaultCoin,
        base: store.getState().defaultBaseCoin
    });
    store.subscribe(() => {
        setCoinMsg({
            coin: store.getState().defaultCoin,
            base: store.getState().defaultBaseCoin
        });
        setCoinPrice(0)
    });
    useEffect(() => {
        const action = upFooterStatus(1);
        store.dispatch(action);
        setTimeout(() => {
            sendWs({
                e: 'subscribe',
                d: {
                    symbol: coinMsg.base,
                    interval: "1m"
                }
            });
            getMessage().message.onmessage = (e: any) => {
                const data = JSON.parse(e.data);
                if (data.e === "subscribe") {
                    setCoinPrice(Number(data.k.c))
                }
            }
        }, 2000)
        return () => {
            sendWs({
                e: 'unsubscribe',
                d: {
                    symbol: coinMsg.base,
                    interval: "1m"
                }
            });
        }
    }, []);
    return (
        <div className="trade-index">
            {/* 导航信息 */}
            <TradeNav coinMsg={coinMsg} t={t} />
            {/* 交易模块 */}
            <TradeOper t={t} coinPrice={coinPrice} />
            {/* 订单信息 */}
            <TradeOrder t={t} />
            {coinPrice === 0 && <LoadData />}
        </div>
    )
};

export default TradeIndex;