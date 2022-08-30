import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import store from "../../../store";
import { setUnCoin } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav';
import './index.scss'
import TesPriceMsg from "./components/price_msg";
import TesPriceK from "./components/price_k";
import TesDealMsg from "./components/deal_msg";
import TradeBtn from "./components/reade_btn";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import LoadData from "./components/load_data";
import { DealMsg } from '../../../utils/types';
import { addListener, removeListener, useSocket } from '../../../utils/hooks'

interface PMsg {
    type: number,
    price: number,
    rate: number,
    precision?: number
}
interface KData {
    second: number,
    type: string
}

let nowKData: any = {};
let precision: number = 0;
let sourceData: any = {};

const TesDetail = (): ReactElement<ReactNode> => {
    const currentCoin = JSON.parse(localStorage.getItem('currentCoin') || '{}');
    const [wsStatus, setWsStatus] = useState<number>(store.getState().wsStatus);
    const [kfilterData, setFilterKData] = useState<KData>(store.getState().kData);
    const resetK = useRef<number>(0);
    const [stamp, setStamp] = useState<number>(0);
    const { send } = useSocket();
    const [priceMsg, setPriceMsg] = useState<PMsg>({
        price: 0,
        type: 1,
        rate: 0,
        precision: precision,
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
        const coinMsg = JSON.parse(localStorage.getItem('currentCoin') || '{}');
        send({
            e: 'kline',
            d: {
                symbol: coinMsg.symbol,
                interval: '1m',
                start: new Date().getTime() - 60 * 1000 * 100,
                end: new Date().getTime(),
            }
        });
        send({
            e: 'subscribe-deal',
            d: {
                symbol: coinMsg.symbol,
            }
        });
    };
    const cancelWS = () => {
        send({
            e: 'unsubscribe-deal',
            d: {
                symbol: currentCoin.symbol,
            }
        });
    };
    useEffect(() => {
        const coinMsg = JSON.parse(localStorage.getItem('currentCoin') || '{}');
        const rate = (Number(coinMsg.price) - Number(coinMsg.yesterday_price)) / Number(coinMsg.yesterday_price) * 100;
        precision = coinMsg.precision;
        setPriceMsg({
            price: Number(coinMsg.price),
            rate: Number(rate),
            type: rate > 0 ? 1 : 0,
            precision: precision,
        });
        wsStatus === 1 && getDetailData();
        return () => {
            cancelWS();
            sessionStorage.removeItem('dataZoom')
        }
    }, [wsStatus, window.location.href])
    const { t } = useTranslation();
    useEffect(() => {
        const coinMsg = JSON.parse(localStorage.getItem('currentCoin') || '{}');
        sessionStorage.setItem('dataZoom', JSON.stringify({ "start": 50, "end": 100 }));
        send({
            e: 'kline',
            d: {
                symbol: coinMsg.symbol,
                interval: kfilterData.type,
                start: new Date().getTime() - kfilterData.second * 1000 * 100,
                end: new Date().getTime(),
            }
        });
    }, [kfilterData])
    useEffect(() => {
        const onMessageDetail = (e: any) => {
            try {
                const data = JSON.parse(e.data);
                const coinMsg = JSON.parse(localStorage.getItem('currentCoin') || '{}');
                if (data.e === 'kline') {
                    // console.log(data)
                    // if (data.k.length <= 10) {
                    //     sourceData.k.shift();
                    //     sourceData.k.push(data.k[0]);
                    //     // console.log(data.k[0])
                    //     setkData(sourceData);
                    //     nowKData = sourceData;
                    // } else {

                    // }
                    // console.log(resetK)

                    if (resetK.current === 1) {
                        // console.log(sourceData)
                        // setkData([...data, ...sourceData])
                        nowKData = {
                            ...nowKData,
                            k: [...data.k, ...nowKData.k]
                        };
                        // const zoom = JSON.parse(sessionStorage.getItem('dataZoom') || '{}');
                        // console.log(zoom)
                        // let dataZoom = {};
                        // if (zoom.end == 100) {
                        //     dataZoom = {
                        //         start: zoom.end / 2,
                        //         end: zoom.end,
                        //     };
                        // } else {
                        //     dataZoom = {
                        //         start: zoom.start / 2,
                        //         end: zoom.end / 2,
                        //     };
                        // }
                        // const dataZoom = {
                        //     start: 0,
                        //     end: 100,
                        // };
                        // sessionStorage.setItem('dataZoom', JSON.stringify(dataZoom));
                        setkData(nowKData);
                        resetK.current = 0;
                    } else {
                        sourceData = data;
                        nowKData = data;
                        setkData(data);
                    }
                    // testRef.current = data;
                    // sourceData = data;
                    // nowKData = data;
                    // setkData(data);
                    // console.log(nowKData)
                };
                if (data.e === 'subscribe' && data.s === coinMsg.symbol) {
                    const rate = (Number(data.k.c) - Number(coinMsg.yesterday_price)) / Number(coinMsg.yesterday_price) * 100
                    setPriceMsg({
                        price: Number(data.k.c),
                        rate: Number(rate),
                        type: rate > 0 ? 1 : 0,
                        precision: precision,
                    });
                    const upCoinMsg = {
                        ...coinMsg,
                        price: Number(data.k.c)
                    };
                    localStorage.setItem('currentCoin', JSON.stringify(upCoinMsg));
                    data.k.t = data.k.t - data.k.t % (kfilterData.second * 1000);
                    if (data.k.t > nowKData.k[nowKData.k.length - 1].t) {
                        // console.log(213)
                        // setResetk(0);
                        // console.log(data.k.t)
                        // console.log(nowKData.k[nowKData.k.length - 1].t)
                        // sourceData = {
                        //     k: nowKData.k
                        // }
                        // send({
                        //     e: 'kline',
                        //     d: {
                        //         symbol: coinMsg.symbol,
                        //         interval: JSON.parse(sessionStorage.getItem('kData') || '{"second": 60, "type": "1m"}').type,
                        //         start: new Date().getTime() - kfilterData.second * 1000 * 100,
                        //         end: new Date().getTime(),
                        //     }
                        // });

                        if (kfilterData.type !== '1m') {
                            let before = nowKData.k[nowKData.k.length - 1];
                            const open = before.o;
                            const close = data.k.c;
                            const high = data.k.h > before.h ? data.k.h : before.h;
                            const low = data.k.l < before.l ? data.k.l : before.l;
                            before = {
                                ...before,
                                o: open,
                                c: close,
                                h: high,
                                l: low,
                                t: data.k.t
                            };
                            nowKData.k.push(before);
                            setkData(nowKData)
                        } else {
                            nowKData.k.push(data.k);
                            setkData(nowKData);
                        };
                        setStamp(new Date().getTime())
                    } else if (data.k.t == nowKData.k[nowKData.k.length - 1].t) {
                        if (kfilterData.type !== '1m') {
                            let before = nowKData.k[nowKData.k.length - 1];
                            const open = before.o;
                            const close = data.k.c;
                            const high = data.k.h > before.h ? data.k.h : before.h;
                            const low = data.k.l < before.l ? data.k.l : before.l;
                            before = {
                                ...before,
                                o: open,
                                c: close,
                                h: high,
                                l: low,
                            };
                            nowKData.k[nowKData.k.length - 1] = before;
                            setStamp(new Date().getTime())
                            setkData(nowKData)
                        } else {
                            nowKData.k[nowKData.k.length - 1] = data.k;
                            setStamp(new Date().getTime())
                            setkData(nowKData);
                        }
                    }
                }
                if (data.e === 'subscribe-deal') {
                    data.d = {
                        ...data.d,
                        precision: precision,
                    }
                    setDealData(data.d);
                }
            } catch {
                // console.log(item)
            }
        };

        addListener(onMessageDetail)
        return () => {
            removeListener(onMessageDetail);
        }
    }, []);
    const getMoreK = (_end_time: number) => {
        const coinMsg = JSON.parse(localStorage.getItem('currentCoin') || '{}');
        send({
            e: 'kline',
            d: {
                symbol: coinMsg.symbol,
                interval: JSON.parse(sessionStorage.getItem('kData') || '{"second": 60, "type": "1m"}').type,
                start: _end_time - kfilterData.second * 1000 * 100,
                end: _end_time,
            }
        });
        resetK.current = 1;
    };
    const win: any = window;
    win.getMoreK = getMoreK;
    const state = JSON.parse(localStorage.getItem('currentCoin') || '{}').coin;
    return (
        <div className="tes-detail">
            <InnerNav leftArrow title={state} withBorder />
            {/* 价格信息 */}
            <TesPriceMsg upMsg={priceMsg} t={t} />
            {/* 价格K线图 */}
            {<TesPriceK upKMsg={kData} time={stamp} t={t} />}
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
