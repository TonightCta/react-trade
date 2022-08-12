import { ReactElement, ReactNode, useImperativeHandle, useEffect, useState } from "react";
import { Empty, PullToRefresh, Toast } from 'antd-mobile';
import { OderListApi, CancelOrderApi } from '../../../request/api';
import React from "react";

interface OrderMsg {
    type: number,//订单类型 当前 & 历史
    tradeType?: string,//交易类型
    tradeQu?: string,//交易队列
    tradeWay?: string,//交易方式
    startTime?: string | number,//筛选开始时间
    endTime?: string | number,//筛选结束时间
    limit?: number,//条数
    t: any,//多语言
}
const OrderList = React.forwardRef<ReactElement,OrderMsg>((props, ref) => {
    const [orderList, setOrderList] = useState<any[]>([]);
    const [dataTotal, setDataTotal] = useState<number>(1);
    const getOrderList = async () => {
        const order_type: string = props.tradeWay && props.tradeWay !== '' ? props.tradeWay === props.t('public.buy_in') ? 'IN' : 'OUT' : ''
        const trade_type: string = props.tradeType && props.tradeType !== '' ? props.tradeType === props.t('public.way_city') ? 'MARKET' : 'LIMIT' : ''
        const params = {
            page: 1,
            limit: props.limit ? props.limit : 10,
            search: {
                group_status: props.type,
                symbol: props.tradeQu?.replace('/', ''),
                direction: order_type,
                trade_type: trade_type,
                start: props.startTime,
                end: props.endTime
            }
        };
        const result = await OderListApi(params);
        setDataTotal(result.data.total)
        setOrderList(result.data.list)
    }
    useEffect(() => {
        getOrderList();
    }, [props])
    useEffect(() => {
        return () => {
            getOrderList();
        }
    }, []);
    // useImperativeHandle(ref,() => ({
        // uploadOrder:getOrderList()
    // }));
    return (
        <div className="order-list">
            {
                dataTotal === 0
                    ? <Empty description='暂无委托' />
                    : <PullToRefresh
                        onRefresh={async () => {
                            await getOrderList()
                        }}
                    >
                        <ul>
                            {
                                orderList.map((el, index): ReactElement => {
                                    return (
                                        <li key={index}>
                                            <div className="coin-msg">
                                                <div className="coin-more">
                                                    <p>{el.deal_amount_symbol}/{el.order_amount_symbol}</p>
                                                </div>
                                                <p className="order-status">
                                                    {el.status === 1 ? props.t('public.deal_all') : <span className="cancel-order" onClick={async () => {
                                                        const result = await CancelOrderApi(el.id);
                                                        console.log(result);
                                                        const { code } = result;
                                                        if (code !== 200) {
                                                            Toast.show(result.message);
                                                            return;
                                                        };
                                                        Toast.show('取消委托成功');
                                                        getOrderList();
                                                    }}>取消委托</span>}
                                                </p>
                                            </div>
                                            <div className="trade-msg-date">
                                                <p className={`${el.direction === 'IN' ? 'buy-color' : 'sell-color'}`}>{el.direction === 'IN' ? props.t('public.buy_in') : props.t('public.sell_out')}</p>
                                                <p>{el.created_at}</p>
                                            </div>
                                            <div className="trade-detail">
                                                <p>
                                                    {/* 委托总量 */}
                                                    {props.t('public.mission_total')}
                                                    &nbsp;{el.order_price}&nbsp;{el.order_amount_symbol}</p>
                                                <p>
                                                    {/* 委托价格 */}
                                                    {props.t('public.mission_price')}
                                                    &nbsp;{el.type === 'BUY' && '市价买入' || el.type === 'BUY_LIMIT' && '限价买入' || el.type === 'SELL' && '市价卖出' || el.type === 'SELL_LIMIT' && '限价卖出'}</p>
                                            </div>
                                            <div className="trade-detail">
                                                <p>
                                                    {/* 已成交量 */}
                                                    {props.t('public.deal_total')}
                                                    &nbsp;{el.deal_amount}&nbsp;{el.deal_amount_symbol}</p>
                                                <p>
                                                    {/* 成交均价 */}
                                                    {props.t('public.deal_price')}
                                                    &nbsp;{el.deal_price}&nbsp;{el.order_amount_symbol}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </PullToRefresh>
            }
        </div>
    )
})

export default React.memo(OrderList);