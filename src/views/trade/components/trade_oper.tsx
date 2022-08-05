import { ReactElement, ReactNode, useState } from "react";
import { Stepper, Button } from 'antd-mobile';

const upList = [
    {
        price: 21310.9,
        amount: 3.768628
    },
    {
        price: 21310.9,
        amount: 3.768628
    },
    {
        price: 21310.9,
        amount: 3.768628
    },
    {
        price: 21310.9,
        amount: 3.768628
    },
    {
        price: 21310.9,
        amount: 3.768628
    }
];
const downList = [
    {
        price: 21310.9,
        amount: 3.768628
    },
    {
        price: 21310.9,
        amount: 3.768628
    },
    {
        price: 21310.9,
        amount: 3.768628
    },
    {
        price: 21310.9,
        amount: 3.768628
    },
    {
        price: 21310.9,
        amount: 3.768628
    }
];

const TradeOper = (): ReactElement<ReactNode> => {

    const [tradeType, setTradeType] = useState<number>(1);
    const [persent, setPersent] = useState<number>(0);

    return (
        <div className="trade-oper">
            <div className="oper-left oper-public">
                {/* 交易类型 */}
                <div className="trade-type">
                    <p className={`${tradeType === 1 ? 'buy-btn' : ''}`} onClick={() => {
                        setTradeType(1)
                    }}>买入</p>
                    <p className={`${tradeType === 2 ? 'sell-btn' : ''}`} onClick={() => {
                        setTradeType(2)
                    }}>卖出</p>
                </div>
                {/* 交易方式 */}
                <div className="trade-way">
                    市价委托
                </div>
                {/* 方式二级 */}
                <div className="way-result">
                    以最优价格{tradeType === 1 ? '买入' : '卖出'}
                </div>
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
                        defaultValue={0}
                        step={1 / 1000}
                    />
                </div>
                {/* 余额 */}
                <div className="use-balance">
                    <p>可用余额</p>
                    <p>0</p>
                </div>
                {/* 快捷操作 */}
                <div className={`fast-oper persent-high-${persent}`}>
                    <div className="percent-item percent-25" onClick={() => {
                        setPersent(25)
                    }}></div>
                    <div className="percent-item percent-50" onClick={() => {
                        setPersent(50)
                    }}></div>
                    <div className="percent-item percent-75" onClick={() => {
                        setPersent(75)
                    }}></div>
                    <div className="percent-item percent-100" onClick={() => {
                        setPersent(100)
                    }}></div>
                </div>
                {/* 交易价格 */}
                <div className="trade-price">
                    <p>交易额</p>
                    <p>0&nbsp;USDT</p>
                </div>
                {/* 交易进行 */}
                <div className="turn-btn">
                    <Button color='primary'>买入</Button>
                </div>
            </div>
            <div className="oper-right oper-public">
                <div className="right-title">
                    <p>价格(USDT)</p>
                    <p>数量(BTC)</p>
                </div>
                <div className="gain-box">
                    <ul className="up-pain">
                        {
                            upList.map((el, index): ReactElement => {
                                return (
                                    <li key={index}>
                                        <p className="el-price">{el.price}</p>
                                        <p className="el-amount">{el.amount}</p>
                                        <div className="el-width"></div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p className="now-price">23062.602187</p>
                    <ul className="down-pain">
                        {
                            downList.map((el, index): ReactElement => {
                                return (
                                    <li key={index}>
                                        <p className="el-price">{el.price}</p>
                                        <p className="el-amount">{el.amount}</p>
                                        <div className="el-width"></div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
};


export default TradeOper;