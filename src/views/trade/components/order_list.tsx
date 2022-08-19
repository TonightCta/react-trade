import { ReactElement, useImperativeHandle, useEffect, useState, useCallback } from "react";
import { Button, DotLoading, Empty, List, PullToRefresh, Toast } from 'antd-mobile';
import { OderListApi, CancelOrderApi } from '../../../request/api';
import React from "react";
import store from "../../../store";
import { sleep } from "antd-mobile/es/utils/sleep";
import { t } from "i18next";

interface OrderMsg {
    type?: number,//订单类型 当前 & 历史
    tradeType?: string,//交易类型
    tradeQu?: string,//交易队列
    tradeWay?: string,//交易方式
    startTime?: string | number,//筛选开始时间
    endTime?: string | number,//筛选结束时间
    limit?: number,//条数
    t: any,//多语言
}
const OrderList = React.forwardRef((props: OrderMsg, ref: any) => {
    const [orderList, setOrderList] = useState<any[]>([]);
    const [dataTotal, setDataTotal] = useState<number>(1);
    const [dataType, setDateType] = useState<any>(1)
    const [upTime, setUpTime] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    // 加载更多
    const [hasMore, setHasMore] = useState<boolean>(true);
    const storeChange = () => {
        store.subscribe(() => {
            setUpTime(store.getState().upLoadOrder)
        });
    };
    const getOrderList = useCallback(async (_type?: number) => {
        setIsLoading(true)
        const order_type: string = props.tradeWay && props.tradeWay !== '' ? props.tradeWay === props.t('public.buy_in') ? 'IN' : 'OUT' : ''
        const trade_type: string = props.tradeType && props.tradeType !== '' ? props.tradeType === props.t('public.way_city') ? 'MARKET' : 'LIMIT' : ''
        const params = {
            page: page,
            limit: props.limit ? props.limit : 8,
            search: {
                group_status: dataType,
                symbol: props.tradeQu?.replace('/', ''),
                direction: order_type,
                trade_type: trade_type,
                start: props.startTime,
                end: props.endTime
            }
        };
        const result = await OderListApi(params);
        setIsLoading(false)
        if (result.data.last_page === page) {
            setHasMore(false);
        };
        setDataTotal(result.data.total);
        if (page !== 1) {
            setOrderList([...orderList, ...result.data.list])
        } else {
            setOrderList(result.data.list)
        }
    }, [])
    const loadMore = async () => {
        setPage(page + 1);
        await getOrderList(dataType);
    }
    useEffect(() => {
        setPage(1);
        setOrderList([]);
        setHasMore(true);
    }, [props, upTime])
    useEffect(() => {
        getOrderList(dataType);
    }, [page])
    useEffect(() => {
        const win: any = window;
        win.getOrderList = getOrderList;
        storeChange();
        getOrderList();
        return () => {
            getOrderList();
            storeChange();
            loadMore();
        }
    }, []);
    const selectOrderType = (_type: number) => {
        setPage(1);
        setOrderList([]);
        setDateType(Number(_type));
        setHasMore(true);
        getOrderList(_type)
    }
    useImperativeHandle(ref, () => ({
        uploadOrder: selectOrderType
    }))
    return (
        <div className="order-list">
            {
                dataTotal === 0
                    ? <Empty description={props.t('public.has_no_entrust')} />
                    :
                    <PullToRefresh
                        onRefresh={async () => {
                            await sleep(1500)
                        }}
                    >
                        <List>
                            <ul>
                                {
                                    orderList.map((el, index): ReactElement => {
                                        return (
                                            <li key={index}>
                                                <div className="coin-msg">
                                                    <div className="coin-more">
                                                        {
                                                            el.direction === 'IN'
                                                                ? <p>{el.deal_amount_symbol}/{el.order_amount_symbol}</p>
                                                                : <p>{el.order_amount_symbol}/{el.deal_amount_symbol}</p>
                                                        }
                                                    </div>
                                                    <p className="order-status">
                                                        {el.status === 1 && props.t('public.deal_all')}
                                                        {el.status === -1 && props.t('public.trade_cancel')}
                                                        {el.status === 0 && <span className="cancel-order" onClick={async () => {
                                                            const result = await CancelOrderApi(el.id);
                                                            const { code } = result;
                                                            if (code !== 200) {
                                                                Toast.show(result.message);
                                                                return;
                                                            };
                                                            //取消委托成功
                                                            Toast.show(props.t('message.cancel_entrust'));
                                                            getOrderList();
                                                        }}>
                                                            {/* 取消委托 */}
                                                            {props.t('public.cancel_entrust')}
                                                        </span>}
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
                                                        &nbsp;{el.order_amount.toFixed(4)}&nbsp;{el.order_amount_symbol}</p>
                                                    <p>
                                                        {/* 委托价格 */}
                                                        {props.t('public.mission_price')}
                                                        &nbsp;{el.type === 'BUY' && props.t('public.buy_market') || el.type === 'BUY_LIMIT' && props.t('public.buy_limit') || el.type === 'SELL' && props.t('public.sell_market') || el.type === 'SELL_LIMIT' && t('public.sell_limit')}</p>
                                                </div>
                                                <div className="trade-detail">
                                                    <p>
                                                        {/* 已成交量 */}
                                                        {el.status !== 1 ? props.t('public.pre_deal') : props.t('public.deal_total')}
                                                        &nbsp;{el.deal_amount.toFixed(4)}&nbsp;{el.deal_amount_symbol}</p>
                                                    <p>
                                                        {/* 成交均价 */}
                                                        {props.t('public.deal_price')}
                                                        &nbsp;{el.deal_price}&nbsp;{el.direction === 'IN' ? el.order_amount_symbol : el.deal_amount_symbol}</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                <li className="load-more-btn">
                                    <div>
                                        {isLoading && <div><DotLoading color='primary' /></div>}
                                        {hasMore && !isLoading && <p><Button size="small" color="default" onClick={() => {
                                            setPage(page + 1)
                                        }}>
                                            {/* 加载更多 */}
                                            {props.t('public.load_more')}
                                        </Button></p>}
                                        {!hasMore && !isLoading && <p style={{ fontSize: '14px', color: '#999' }} className="no-more-data">
                                            {/* 没有更多了 */}
                                            {props.t('public.no_more')}
                                        </p>}
                                    </div>
                                </li>
                            </ul>
                        </List>
                        {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
                    </PullToRefresh>
            }
        </div>
    )
})

export default React.memo(OrderList);