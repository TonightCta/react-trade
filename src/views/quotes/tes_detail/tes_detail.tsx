import { ReactElement, ReactNode, useEffect, useState } from "react";
import store from "../../../store";
import { setUnCoin, upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav';
import './index.scss'
import TesPriceMsg from "./components/price_msg";
import TesPriceK from "./components/price_k";
import TesDealMsg from "./components/deal_msg";
import TradeBtn from "./components/reade_btn";
import { useTranslation } from "react-i18next";
import { getMessage, sendWs } from "../../../utils/ws";
import { withRouter } from "react-router-dom";
import LoadData from "./components/load_data";
import { DealMsg } from '../../../utils/types'

interface PMsg {
    type: number,
    price: number,
    rate: number
}
interface KData {
    second: number,
    type: string
}


const TesDetail = (): ReactElement<ReactNode> => {
    const currentCoin = store.getState().currentCoin;
    const [wsStatus, setWsStatus] = useState<number>(store.getState().wsStatus);
    const [kfilterData, setFilterKData] = useState<KData>(store.getState().kData)
    const [priceMsg, setPriceMsg] = useState<PMsg>({
        price: 0,
        type: 1,
        rate: 0
    });
    const [kData, setkData] = useState<{ k: any }>(
        {
            k: []
        }
    );
    const [dealData, setDealData] = useState<DealMsg>({
        dc: '',
        dt: 0,
        p: '',
        q: ''
    });
    store.subscribe(() => {
        setWsStatus(store.getState().wsStatus);
        setFilterKData(store.getState().kData);
    })
    const getDetailData = () => {
        sendWs({
            e: 'kline',
            d: {
                symbol: currentCoin.symbol,
                interval: '1m',
                start: new Date().getTime() - 60 * 1000 * 100,
                end: new Date().getTime(),
            }
        });
        // sendWs({
        //     e: 'subscribe',
        //     d: {
        //         symbol: currentCoin.symbol,
        //         interval: '1m',
        //     }
        // });
        sendWs({
            e: 'subscribe-deal',
            d: {
                symbol: currentCoin.symbol,
            }
        });
        getMessage().message.onmessage = ((item: any) => {
            try {
                JSON.parse(item.data);
                const data = JSON.parse(item.data);
                if (data.e === 'kline') {
                    setkData(data);
                    // console.log(data)
                };
                if (data.e === 'subscribe' && data.s === store.getState().currentCoin.symbol) {
                    const rate = (Number(data.k.c) - Number(currentCoin.yesterday_price)) / Number(currentCoin.yesterday_price) * 100
                    setPriceMsg({
                        price: Number(data.k.c),
                        rate: Number(rate),
                        type: rate > 0 ? 1 : 0,
                    }); 
                    if (data.k.t >= kData.k[kData.k.length - 1].t) {
                        sendWs({
                            e: 'kline',
                            d: {
                                symbol: currentCoin.symbol,
                                interval: kfilterData.type,
                                start: new Date().getTime() - kfilterData.second * 1000 * 100,
                                end: new Date().getTime(),
                            }
                        });
                    }
                }
                if (data.e === 'subscribe-deal') {
                    setDealData(data.d);
                }
            } catch {
                // console.log(item)
            }

        });
    };
    useEffect(() => {
        const coinMsg = JSON.parse(sessionStorage.getItem('currentCoin') || '{}');
        const rate = (Number(coinMsg.price) - Number(coinMsg.yesterday_price)) / Number(coinMsg.yesterday_price) * 100
        setPriceMsg({
            price: Number(coinMsg.price),
            rate: Number(rate),
            type: rate > 0 ? 1 : 0,
        });
        wsStatus === 1 && getDetailData();
    }, [wsStatus])
    const { t } = useTranslation();
    useEffect(() => {
        sendWs({
            e: 'kline',
            d: {
                symbol: currentCoin.symbol,
                interval: kfilterData.type,
                start: new Date().getTime() - kfilterData.second * 1000 * 100,
                end: new Date().getTime(),
            }
        });
    }, [kfilterData])
    const cancelWS = () => {
        // sendWs({
        //     e: 'unsubscribe',
        //     d: {
        //         symbol: currentCoin.symbol,
        //         interval: '1m',
        //     }
        // });
        sendWs({
            e: 'unsubscribe-deal',
            d: {
                symbol: currentCoin.symbol,
            }
        });
    };
    useEffect(() => {
        const action = upFooterStatus(0);
        setTimeout(() => {
            store.dispatch(action);
        })
        return () => {
            const action = setUnCoin('');
            store.dispatch(action);
            cancelWS();
        }
    }, []);
    const state = store.getState();
    return (
        <div className="tes-detail">
            <InnerNav leftArrow title={state.currency} withBorder />
            {/* 价格信息 */}
            <TesPriceMsg upMsg={priceMsg} t={t} />
            {/* 价格K线图 */}
            {<TesPriceK upKMsg={kData} t={t} />}
            {/* 成交信息 */}
            <TesDealMsg dealData={dealData} t={t} />
            {/* 交易按钮 */}
            <TradeBtn t={t} />
            {/* 加载 */}
            {priceMsg.price === 0 && <LoadData />}
        </div>
    )
};

export default withRouter(TesDetail);
