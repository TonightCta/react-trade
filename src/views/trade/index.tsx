import React, { useEffect, useState } from "react";
import TradeNav from "./components/trade_nav";
import TradeOper from "./components/trade_oper";
import TradeOrder from "./components/trade_order";
import './index.scss';
import store from "../../store";
import { useTranslation } from "react-i18next";
import LoadData from "../quotes/tes_detail/components/load_data";
import { addListener, removeListener, useSocket } from "../../utils/hooks";

interface Coin {
    coin: string,
    base: string
}
interface Depch {
    Price: number | string,
    Quantity: number | string,
}


const TradeIndex = React.forwardRef((props: any, ref: any) => {
    const { t } = useTranslation();
    const [coinPrice, setCoinPrice] = useState<number>(0);
    const { send } = useSocket();
    // const orderList: any = useRef(null);
    // ws服务连接状态
    const [wsStatus, setWsStatus] = useState<number>(store.getState().wsStatus)
    const [coinMsg, setCoinMsg] = useState<Coin>({
        coin: `${JSON.parse(sessionStorage.getItem('currentCoin') || '{}').base}/${JSON.parse(sessionStorage.getItem('currentCoin') || '{}').target}`,
        base: JSON.parse(sessionStorage.getItem('currentCoin') || '{}').symbol
    });
    store.subscribe(() => {
        setCoinMsg({
            coin: `${JSON.parse(sessionStorage.getItem('currentCoin') || '{}').base}/${JSON.parse(sessionStorage.getItem('currentCoin') || '{}').target}`,
            base: JSON.parse(sessionStorage.getItem('currentCoin') || '{}').symbol
        });
        setCoinPrice(Number(JSON.parse(sessionStorage.getItem('currentCoin') || '{}').price));
        setWsStatus(store.getState().wsStatus)
    });
    const [sellQUList, setSellQUlist] = useState<Depch[]>([]);
    const [buyQUList, setBuyQUList] = useState<Depch[]>([]);
    const sendWSDepth = () => {
        send({
            e: 'subscribe-depth',
            d: {
                symbol: coinMsg.base,
            }
        });
    }
    useEffect(() => {
        setCoinPrice(Number(JSON.parse(sessionStorage.getItem('currentCoin') || '{}').price));
        wsStatus === 1 && sendWSDepth();
    }, [wsStatus]);
    const unSendWS = () => {
        send({
            e: 'unsubscribe-depth',
            d: {
                symbol: coinMsg.base,
                interval: "1m"
            }
        });
    }
    useEffect(() => {

        const onMessageTrade = ((e: any) => {
            try {
                const data = JSON.parse(e.data);

                if (data.e === "subscribe" && data.s === store.getState().currentCoin.symbol) {
                    setCoinPrice(Number(data.k.c))
                };
                if (data.e === 'subscribe-depth') {
                    setBuyQUList(data.d.asks);
                    setSellQUlist(data.d.bids);
                }
            } catch (err) {
                console.log(err)
            }
        });
        addListener(onMessageTrade);
        return () => {
            unSendWS();
            removeListener(onMessageTrade);
        }
    }, []);
    return (
        <div className="trade-index">
            {/* 导航信息 */}
            <TradeNav coinMsg={coinMsg} t={t} />
            {/* 交易模块 */}
            <TradeOper t={t} sellQUList={sellQUList} buyQUList={buyQUList} coinPrice={coinPrice} />
            {/* 订单信息 */}
            <TradeOrder t={t} />
            {coinPrice === 0 && <LoadData />}
        </div>
    )
});

export default TradeIndex;