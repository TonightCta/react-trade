import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Store } from '../../../store/app/reducer'
import { Stepper, Button, Popup, Toast } from 'antd-mobile';
import store from "../../../store";
import { QuireBalance } from '../../../utils'
import React from "react";
import { PlaceCoinOrderApi } from '../../../request/api';

interface Depch {
    Price: number | string,
    Quantity: number | string,
}


interface Props {
    coinPrice: number,
    t: any,
    sellQUList: Depch[],
    buyQUList: Depch[],
    formWSSBalance: number,
    toWSSBalance: number
}
const TradeOper = (props: Props): ReactElement<ReactNode> => {
    //交易类型 1 - 买入 2 - 卖出
    const [tradeType, setTradeType] = useState<number>(1);
    //购买比例
    const [persent, setPersent] = useState<number>(0);
    //交易币种信息
    const [state, setState] = useState<Store>(store.getState());
    //队列可用余额
    const [formBalance, setFormBalance] = useState<number>(0);
    const LAND: string | undefined = process.env.REACT_APP_LAND
    const [toBalance, setToBalance] = useState<number>(0);
    const getBalance = async () => {
        setFormBalance(await QuireBalance(sessionStorage.getItem('tradeFromCoin') || ''))
        setToBalance(await QuireBalance(sessionStorage.getItem('tradeToCoin') || ''));
    };
    // 交易深度信息
    const [upList, setUpList] = useState<Depch[]>([
        {
            Price: '',
            Quantity: '',
        },
        {
            Price: '',
            Quantity: '',
        },
        {
            Price: '',
            Quantity: '',
        },
        {
            Price: '',
            Quantity: '',
        },
        {
            Price: '',
            Quantity: '',
        }
    ]);
    const [downList, setDownList] = useState<Depch[]>([
        {
            Price: '',
            Quantity: '',
        },
        {
            Price: '',
            Quantity: '',
        },
        {
            Price: '',
            Quantity: '',
        },
        {
            Price: '',
            Quantity: '',
        },
        {
            Price: '',
            Quantity: '',
        }
    ]);
    useEffect(() => {
        if (props.sellQUList.length > 0) {
            setUpList(props.sellQUList.slice(props.sellQUList.length - 5, props.sellQUList.length));
            setDownList(props.buyQUList.slice(props.buyQUList.length - 5, props.buyQUList.length));
        }
    }, [props]);
    useEffect(() => {
        if (props.formWSSBalance > 0) {
            setFormBalance(props.formWSSBalance);
        }
        if (props.toWSSBalance > 0) {
            setToBalance(props.toWSSBalance)
        }
    }, [props.formWSSBalance, props.toWSSBalance])
    //交易金额
    const [tradeAmount, setTradeAmount] = useState<number>(0);
    //交易换算后数量
    const [tradeToAmount, setTradeToAmount] = useState<number>(0);
    //交易子类型 - 市价 & 限价 1 - 市价  2 - 限价
    const [tradeWay, setTradeWay] = useState<number>(1);
    //选择子类型Popup
    const [selectWayBox, setSelectWayBox] = useState<boolean>(false);
    //交易等待
    const [waitResult,setWaitResult] = useState<boolean>(false);
    //限价金额
    const [limitPrice, setLimitPrice] = useState<number>(0);
    //切换交易方式置空默认数据
    useEffect(() => {
        setTradeAmount(0);
        setPersent(0);
    }, [tradeType]);
    //计算交易额度
    useEffect(() => {
        if (tradeWay === 1) {
            if (tradeType === 1) {
                setTradeToAmount(tradeAmount / props.coinPrice)
            } else {
                setTradeToAmount(tradeAmount * props.coinPrice)
            }
        } else {
            if (tradeType === 1) {
                setTradeToAmount(tradeAmount / limitPrice)
            } else {
                setTradeToAmount(tradeAmount * limitPrice)
            }
        }
    }, [tradeAmount, props.coinPrice, limitPrice, tradeWay]);
    //Bus更新余额
    const winRetsetBalance = (_bal:any) => {
        if(Object.keys(_bal.balance)[0] === state.tradeFromCoin){
            setFormBalance(Number(Object.values(_bal.balance)[0]))
        }
        if(Object.keys(_bal.balance)[0] === state.tradeToCoin){
            setToBalance(Number(Object.values(_bal.balance)[0]))
        }
    };
    const win:any = window;
    win.winRetsetBalance = winRetsetBalance;
    //下单交易
    const submitPlaceOrder = async () => {
        if (tradeAmount == 0) {
            //请输入交易金额
            Toast.show(props.t('message.type_trade_amount'));
            return;
        };
        if (tradeType === 1 && state.tradeFromCoin === 'USDT' && tradeAmount < 10) {
            Toast.show(props.t('message.min_10'));
            return
        }
        if (tradeWay === 2) {
            if (limitPrice === 0) {
                //请输入限价金额
                Toast.show(props.t('message.type_limit_amount'));
                return;
            }
        };
        setWaitResult(true);
        const type =
            tradeType === 1 && tradeWay === 1 && 'BUY' ||
            tradeType === 1 && tradeWay === 2 && 'BUY_LIMIT' ||
            tradeType === 2 && tradeWay === 1 && 'SELL' ||
            tradeType === 2 && tradeWay === 2 && 'SELL_LIMIT'
        const params = {
            type: type,
            symbol: state.currentCoin.symbol,
            price: limitPrice,
            amount: tradeAmount
        };
        const result = await PlaceCoinOrderApi(params);
        const { code, data } = result;
        setWaitResult(false);
        if (code !== 200) {
            Toast.show(result.message);
            return;
        };
        //交易成功
        Toast.show(props.t('message.trade_success'));
        // const action = setReloadOrder(new Date().getTime());
        // store.dispatch(action);
        const win: any = window;
        if (tradeWay === 1 && state.orderType === 2) {
            win.getOrderList()
        }
        if (tradeWay === 2 && state.orderType === 1) {
            win.getOrderList()
        };
        setTradeAmount(0);
        setPersent(0);
        setFormBalance(Number(data.balance[state.tradeFromCoin]))
        setToBalance(Number(data.balance[state.tradeToCoin]))
    }
    const storeChange = () => {
        store.subscribe(() => {
            setState(store.getState());
        });
    };
    useEffect(() => {
        storeChange();
        return () => {
            storeChange();
            setUpList([]);
            setDownList([]);
        }
    }, [])
    useEffect(() => {
        getBalance();
    }, [state.currentCoin])
    const colosePopip = () => {
        setSelectWayBox(false);
    }
    return (
        <div className="trade-oper">
            <div className="oper-left oper-public">
                {/* 交易类型 */}
                <div className={`trade-type ${process.env.REACT_APP_LAND == '1' && 'trade-type-th' || process.env.REACT_APP_LAND == '3' && 'trade-type-new' || ''}`}>
                    <p className={`${tradeType === 1 ? 'buy-btn' : ''}`} onClick={() => {
                        setTradeType(1)
                    }}>
                        {/* 买入 */}
                        {props.t('public.buy_in')}
                    </p>
                    <p className={`${tradeType === 2 ? 'sell-btn' : ''}`} onClick={() => {
                        setTradeType(2)
                    }}>
                        {/* 卖出 */}
                        {props.t('public.sell_out')}
                    </p>
                </div>
                {/* 交易方式 */}
                <div className="trade-way" onClick={() => {
                    setSelectWayBox(true)
                }}>
                    {/* 市价委托 */}
                    {tradeWay === 1 ? props.t('public.way_city') : props.t('public.entrust_limit')}
                </div>
                {/* 方式二级 */}
                {
                    tradeWay === 1 ?
                        <div className="way-result">
                            {/* 以最优价格 */}
                            {props.t('public.best_price')}
                            {tradeType === 1 ? props.t('public.buy_in') : props.t('public.sell_out')}
                        </div>
                        : <div className="limit-price-inp">
                            <Stepper
                                min={0}
                                style={{
                                    '--border': '1px solid #f5f5f5',
                                    '--border-inner': 'none',
                                    '--height': '36px',
                                    '--input-background-color': '#ffffff',
                                }}
                                onChange={(number: number) => {
                                    setLimitPrice(number);
                                }}
                                defaultValue={props.coinPrice}
                                value={Number(limitPrice)}
                                step={1 / (state.tradeFromCoin === 'USDT' && tradeType === 1 ? 1 : 100)}
                            />
                        </div>
                }

                {/* 交易数量 */}
                <div className="trade-count">
                    <Stepper
                        min={0}
                        style={{
                            '--border': '1px solid #f5f5f5',
                            '--border-inner': 'none',
                            '--height': '36px',
                            '--input-background-color': '#ffffff',
                        }}
                        onChange={(number: number) => {
                            setTradeAmount(number);
                            setPersent(0);
                        }}
                        defaultValue={0}
                        value={Number(tradeAmount.toFixed(4))}
                        step={1 / (state.tradeFromCoin === 'USDT' && tradeType === 1 ? 1 : 100)}
                    />
                </div>
                {/* 余额 */}
                <div className="use-balance">
                    <p>
                        {/* 可用余额 */}
                        {props.t('public.use_balance')}
                    </p>
                    <p>{tradeType === 1 ? formBalance.toFixed(8) : toBalance.toFixed(8)}&nbsp;{tradeType === 1 ? state.tradeFromCoin : state.tradeToCoin}</p>
                </div>
                {/* 快捷操作 */}
                <div className={`fast-oper persent-high-${persent} ${process.env.REACT_APP_LAND == '1' && `persent-high-${persent}-th` || process.env.REACT_APP_LAND == '3' && `persent-high-${persent}-new` || ''}`}>
                    <div className="percent-item percent-25" onClick={() => {
                        setTradeAmount(tradeType === 1 ? formBalance * 0.25 : toBalance * 0.25)
                        setPersent(25)
                    }}></div>
                    <div className="percent-item percent-50" onClick={() => {
                        setTradeAmount(tradeType === 1 ? formBalance * 0.5 : toBalance * 0.5)
                        setPersent(50)
                    }}></div>
                    <div className="percent-item percent-75" onClick={() => {
                        setTradeAmount(tradeType === 1 ? formBalance * 0.75 : toBalance * 0.75)
                        setPersent(75)
                    }}></div>
                    <div className="percent-item percent-100" onClick={() => {
                        setTradeAmount(tradeType === 1 ? formBalance : toBalance)
                        setPersent(100)
                    }}></div>
                </div>
                {/* 交易价格 */}
                <div className="trade-price">
                    <p>
                        {/* 交易额 */}
                        {props.t('public.trade_amount')}
                    </p>
                    <p>{tradeToAmount.toFixed(6)}&nbsp;{tradeType == 1 ? state.tradeToCoin : state.tradeFromCoin}</p>
                </div>
                {/* 交易进行 */}
                <div className={`turn-btn ${tradeType === 2 ? 'sell-btn' : ''} ${LAND == '3' && tradeType === 2 && 'sell-btn-new'}`} onClick={() => {
                    submitPlaceOrder();
                }}>
                    <Button color='primary' loading={waitResult} disabled={waitResult}>
                        {tradeType === 1 ? props.t('public.buy_in') : props.t('public.sell_out')}
                    </Button>
                </div>
            </div>
            <div className="oper-right oper-public">
                <div className="right-title">
                    <p>
                        {/* 价格 */}
                        {props.t('public.price')}
                        ({state.tradeFromCoin})</p>
                    <p>
                        {/* 数量 */}
                        {props.t('public.num')}
                        ({state.tradeToCoin})</p>
                </div>
                <div className="gain-box">
                    <ul className="up-pain">
                        {
                            upList.map((el, index): ReactElement => {
                                return (
                                    <li key={index}>
                                        <p className="el-price">{el.Price ? Number(el.Price).toFixed(state.currentCoin.precision) : '-'}</p>
                                        <p className="el-amount">{el.Quantity ? Number(el.Quantity).toFixed(6) : '-'}</p>
                                        {/* <div className="el-width"></div> */}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p className={`now-price ${process.env.REACT_APP_AREA == '66' ? 'now-price-th' : ''}`}>{props.coinPrice.toFixed(state.currentCoin.precision)}</p>
                    <ul className="down-pain">
                        {
                            downList.map((el, index): ReactElement => {
                                return (
                                    <li key={index}>
                                        <p className="el-price">{el.Price ? Number(el.Price).toFixed(state.currentCoin.precision) : '-'}</p>
                                        <p className="el-amount">{el.Quantity ? Number(el.Quantity).toFixed(6) : '-'}</p>
                                        {/* <div className="el-width"></div> */}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <Popup visible={selectWayBox} onMaskClick={() => {
                colosePopip()
            }}>
                <div className="select-trade-way">
                    <ul>
                        <li onClick={() => { setTradeWay(1); colosePopip() }}>
                            {/* 市价委托 */}
                            {props.t('public.entrust_market')}
                        </li>
                        <li onClick={() => {
                            setTradeWay(2);
                            setLimitPrice(props.coinPrice);
                            colosePopip();
                        }}>
                            {/* 限价委托 */}
                            {props.t('public.entrust_limit')}
                        </li>
                    </ul>
                    <div className="cancel-popup" onClick={() => { colosePopip(); }}>
                        {/* 取消 */}
                        {props.t('public.cancel')}
                    </div>
                </div>
            </Popup>
        </div>
    )
};


export default React.memo(TradeOper);