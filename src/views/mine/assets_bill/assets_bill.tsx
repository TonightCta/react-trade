import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import { upBillCoin, upFooterStatus } from "../../../store/app/action_creators";
import { List, PullToRefresh, InfiniteScroll, Empty, DotLoading, Button } from 'antd-mobile'
import { useTranslation } from "react-i18next";
import { AssetsBillApi } from '../../../request/api'
import './index.scss'
import { sleep } from "antd-mobile/es/utils/sleep";


const AssetsBill = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [searchVal, setSearchVal] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [billList, setBillList] = useState<any[]>([]);
    const [sourceBill, setSourceList] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [dataTotal, setDataTotal] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const getBillList = async () => {
        setIsLoading(true);
        const params = {
            page: page,
            limit: 15,
            search: {
                coin: store.getState().billCoin
            }
        }
        const result = await AssetsBillApi(params);
        setIsLoading(false);
        if (result.data.last_page === page) {
            setHasMore(false);
        };
        setDataTotal(result.data.total);
        if (page !== 1) {
            setBillList([...billList, ...result.data.list]);
            setSourceList([...billList, ...result.data.list]);
        } else {
            setBillList([...result.data.list]);
            setSourceList([...result.data.list]);
        }
    };
    const loadMore = async () => {
        // setPage(page + 1)
        // await getBillList();
    }
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action);
        // getBillList();
        return () => {
            const action = upBillCoin('');
            store.dispatch(action);
            getBillList();
            loadMore();
        }
    }, []);
    useEffect(() => {
        getBillList()
    }, [page])
    useEffect((): void => {
        const startFilter = () => {
            const arr = billList;
            const filterL: any[] = [];
            arr.map((item) => {
                if (item.coin.toLocaleLowerCase().search(searchVal) != -1) {
                    filterL.push(item)
                }
            });
            setBillList(filterL)
        }
        searchVal ? startFilter() : setBillList(sourceBill)
    }, [searchVal])
    return (
        <div className="assets-bill">
            <InnerNav title={t('public.bill_list')} search withBorder leftArrow getSearchVal={(val: string) => {
                setSearchVal(val)
            }} />
            <div className="bill-list">
                {
                    dataTotal === 0
                        //暂无流水
                        ? <Empty description={t('public.has_no_bill')} />
                        : <PullToRefresh onRefresh={async () => {
                            await sleep(1500)
                        }}>
                            <List>
                                <ul>
                                    {
                                        billList.map((el, index): ReactElement => {
                                            return (
                                                <li key={index} className={`
                                            ${el.type === 2 && 'buy-color' ||
                                                    el.type === 3 && 'sell-color' ||
                                                    el.type === 1 && 'charged-color' ||
                                                    el.type === 4 && 'withdraw-color' ||
                                                    el.type === 98 && 'withdraw-freeze' ||
                                                    el.type === 9 && 'admin-color'
                                                    }`}>
                                                    {/* <p className="icon-type">{el.coin}</p> */}
                                                    <div className="order-title">
                                                        {/* <p className="order-type">{[
                                                            // 购买
                                                            el.type === 2 && t('public.buy') ||
                                                            // 售出
                                                            el.type === 3 && t('public.sell') ||
                                                            // 充币
                                                            el.type === 1 && t('public.recharge') ||
                                                            //提币
                                                            el.type === 4 && t('public.withdraw') ||
                                                            //冻结
                                                            el.type === 98 && '提币冻结' ||
                                                            // Admin
                                                            el.type === 9 && 'Admin'
                                                        ]}</p> */}
                                                        <p className="order-type">
                                                            {el.coin}&nbsp;{[
                                                                // 购买
                                                                el.type === 2 && t('public.buy') ||
                                                                // 售出
                                                                el.type === 3 && t('public.sell') ||
                                                                // 充币
                                                                el.type === 1 && t('public.recharge') ||
                                                                //提币
                                                                el.type === 4 && t('public.withdraw') ||
                                                                //冻结
                                                                el.type === 98 && t('public.freeze_coin') ||
                                                                // Admin
                                                                el.type === 9 && 'Admin'
                                                            ]}
                                                        </p>
                                                        <p className="now-balance">{el.amount > 0 ? '+' : ''}{el.true_amount}</p>
                                                    </div>
                                                    <div className="fee-msg">
                                                        <p className="order-date">{el.time}</p>
                                                        <div className="fee-and-amount">
                                                            {/* 手续费 */}
                                                            <p>{t('public.fee')}&nbsp;{Number(el.fee).toFixed(4)}</p>
                                                            {/* <p>{el.amount > 0 ? '+' : ''}{el.true_amount}</p> */}
                                                        </div>
                                                    </div>
                                                    <div className="fee-msg">
                                                        <p className="order-date">{t('public.type')}:{[
                                                            // 购买
                                                            el.type === 2 && t('public.buy') ||
                                                            // 售出
                                                            el.type === 3 && t('public.sell') ||
                                                            // 充币
                                                            el.type === 1 && t('public.recharge') ||
                                                            //提币
                                                            el.type === 4 && t('public.withdraw') ||
                                                            //冻结
                                                            el.type === 98 && t('public.freeze_coin') ||
                                                            // Admin
                                                            el.type === 9 && 'Admin'
                                                        ]}</p>
                                                        <div className="fee-and-amount">
                                                            {/* 余额 */}
                                                            <p>{t('public.balance')}&nbsp;{Number(el.balance).toFixed(4)}</p>
                                                        </div>
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
                                                {t('public.load_more')}
                                            </Button></p>}
                                            {!hasMore && !isLoading && <p style={{ fontSize: '14px', color: '#999' }} className="no-more-data">
                                                {/* 没有更多了 */}
                                                {t('public.no_more')}
                                            </p>}
                                        </div>
                                    </li>
                                </ul>
                            </List>
                            {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
                        </PullToRefresh>
                }


            </div>
        </div>
    )
};

export default AssetsBill;