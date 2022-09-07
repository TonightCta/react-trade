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
    const [wssBalance, setWssBalance] = useState<{
        fromBlance: number,
        toBalance: number
    }>({
        fromBlance: 0,
        toBalance: 0
    })
    const { send } = useSocket();
    // const orderList: any = useRef(null);
    // ws服务连接状态
    const [wsStatus, setWsStatus] = useState<number>(store.getState().wsStatus);
    const conMsg = JSON.parse(localStorage.getItem('currentCoin') || '{}');
    const [coinMsg, setCoinMsg] = useState<Coin>({
        coin: `${conMsg.base}/${conMsg.target}`,
        base: conMsg.symbol
    });
    store.subscribe(() => {
        const conMsg = JSON.parse(localStorage.getItem('currentCoin') || '{}');
        setCoinMsg({
            coin: `${conMsg.base}/${conMsg.target}`,
            base: conMsg.symbol
        });
        setCoinPrice(Number(conMsg.price));
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
        setCoinPrice(Number(JSON.parse(localStorage.getItem('currentCoin') || '{}').price));
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
                if (data.e === 'balance') {
                    if (data.d.coin === store.getState().tradeFromCoin) {
                        setWssBalance({
                            ...wssBalance,
                            fromBlance: data.d.balance
                        })
                    }
                    if (data.d.coin === store.getState().tradeToCoin) {
                        setWssBalance({
                            ...wssBalance,
                            toBalance: data.d.balance
                        })
                    }
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
            <TradeOper t={t} formWSSBalance={wssBalance.fromBlance} toWSSBalance={wssBalance.toBalance} sellQUList={sellQUList} buyQUList={buyQUList} coinPrice={coinPrice} />
            {/* 订单信息 */}
            <TradeOrder t={t} />
            {coinPrice === 0 && <LoadData />}
        </div>
    )
});

export default TradeIndex;