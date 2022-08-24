import { ReactElement, ReactNode } from "react";
import { DotLoading, Empty, PullToRefresh } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import { PullStatus } from 'antd-mobile/es/components/pull-to-refresh';
import { useHistory } from 'react-router-dom'
import { setTradeFrom, setTradeTo, upCurrency, upCurrentCoin } from "../../../store/app/action_creators";
import store from "../../../store";
import { useTranslation } from 'react-i18next';
import { useSocket } from "../../../utils/hooks";

type TesMsg = {
    coin: string,
    hourTotal: number,
    price: number,
    rate: number | string,
    type: number,
    symbol?: string,
    target?: string,
    base?: string,
    id?: any,
    status?: number,
    precision?: number
}
interface Props {
    data: Array<TesMsg>,
    type?: number,
    closeDraw?: () => void,
    total: number,
    base?: string,
}
const TesAllList = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    const { send } = useSocket()
    const statusRecord: Record<PullStatus, ReactElement | string> = {
        pulling: t('public.pull_down'),//下拉刷新
        canRelease: t('public.freed_down'),//释放刷新
        refreshing: <DotLoading color='primary' />,
        complete: t('public.down_over'),//刷新完成
    }
    return (
        <div className="tes-all-list">
            {
                props.total === 0
                    ? <Empty description={t('public.has_no_data')} />
                    : <PullToRefresh onRefresh={async () => {
                        await sleep(3000)
                    }} renderText={status => {
                        return <div>{statusRecord[status]}</div>
                    }}>
                        {props.data.length > 0 ? <ul>
                            {
                                props.data.map((el: TesMsg, index: number): ReactElement => {
                                    return (
                                        <div key={index}>
                                            {
                                                el.status == 1 && <li key={index} className={`${el.type === 1 ? 'up-color' : 'down-color'}`} onClick={() => {
                                                    const action = upCurrency(el.coin);
                                                    store.dispatch(action);
                                                    const actiton = upCurrentCoin(el);
                                                    store.dispatch(actiton);
                                                    const viewQu = (): void => {
                                                        // send({
                                                        //     e: 'unsubscribe-deal',
                                                        //     d: {
                                                        //         symbol: String(props.base),
                                                        //     }
                                                        // });
                                                        history.push('/quotes-detail');
                                                    };
                                                    const viewTrade = (): void => {
                                                        send({
                                                            e: 'unsubscribe-depth',
                                                            d: {
                                                                symbol: String(props.base),
                                                            }
                                                        });
                                                        setTimeout(() => {
                                                            send({
                                                                e: 'subscribe-depth',
                                                                d: {
                                                                    symbol: String(el.symbol),
                                                                }
                                                            });
                                                        }, 100)
                                                        const actionFrom = setTradeFrom(String(el.target));
                                                        const actionTo = setTradeTo(String(el.base));
                                                        store.dispatch(actionFrom);
                                                        store.dispatch(actionTo);
                                                        props.closeDraw!()
                                                        // console.log(props.base)
                                                        // sendWs({
                                                        //     e: 'unsubscribe',
                                                        //     d: {
                                                        //         symbol: String(props.base),
                                                        //         interval: "1m"
                                                        //     }
                                                        // });
                                                    }
                                                    props.type === 1 ? viewQu() : viewTrade();
                                                }}>
                                                    <div className="list-public">
                                                        <div className="coin-msg-hour">
                                                            <p>{el.coin}</p>
                                                            <p>24H{t('public.vol')}&nbsp;{el.hourTotal}</p>
                                                        </div>
                                                    </div>
                                                    <div className="list-public">
                                                        <p className="list-price">{Number(el.price).toFixed(el.precision)}</p>
                                                        <p className="list-rate">
                                                            {el.type === 1 ? '+' : ''}
                                                            {el.rate}%
                                                        </p>
                                                    </div>
                                                </li>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </ul> : <div className="load-tes">
                            <DotLoading color="#3370ff" />
                        </div>}
                    </PullToRefresh>
            }

        </div>
    )
};

export default TesAllList;