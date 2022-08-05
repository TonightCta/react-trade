import { ReactElement, ReactNode } from "react";
import { PullToRefresh } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import React from "react";

interface OrderMsg{
    type:number,//订单类型 当前 & 历史
    tradeType?:number,//交易类型
    tradeQu?:string,//交易队列
    tradeWay?:number,//交易方式
}

const Order = [
    {
        coin: 'TRX/USDT',
        type: 1,
        amount: 6.15,
        dealAmount: 99.2,
        dealType: 1,
        dealPrice: 0.065,
        date: '07/24 14:32',
        status: 1,
    },
    {
        coin: 'TRX/USDT',
        type: 2,
        amount: 6.15,
        dealAmount: 99.2,
        dealType: 2,
        dealPrice: 0.065,
        date: '07/24 14:32',
        status: 2,
    },
]
const OrderList = (props:OrderMsg): ReactElement<ReactNode> => {
    return (
        <div className="order-list">
            <PullToRefresh
                onRefresh={async () => {
                    await sleep(2000)
                }}
            >
                <ul>
                    {
                        Order.map((el, index): ReactElement => {
                            return (
                                <li key={index}>
                                    <div className="coin-msg">
                                        <div className="coin-more">
                                            <p>{el.coin}</p>
                                        </div>
                                        <p className="order-status">{el.status === 1 ? "完全成交" : "进行中"}</p>
                                    </div>
                                    <div className="trade-msg-date">
                                        <p className={`${el.type === 1 ? 'buy-color' : 'sell-color'}`}>{el.type === 1 ? '买入' : '卖出'}</p>
                                        <p>{el.date}</p>
                                    </div>
                                    <div className="trade-detail">
                                        <p>委托总量&nbsp;{el.amount}&nbsp;USDT</p>
                                        <p>委托价格&nbsp;{el.dealType === 1 ? '市价' : '挂单'}</p>
                                    </div>
                                    <div className="trade-detail">
                                        <p>已成交量&nbsp;{el.dealAmount}&nbsp;TRX</p>
                                        <p>成交均价&nbsp;{el.dealPrice}&nbsp;USDT</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </PullToRefresh>

        </div>
    )
};

export default React.memo(OrderList);