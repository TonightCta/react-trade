import { ReactElement, ReactNode } from "react";
import { DotLoading, Empty, PullToRefresh } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import { PullStatus } from 'antd-mobile/es/components/pull-to-refresh';
import { useHistory } from 'react-router-dom'
import { upCurrency, upCurrentCoin } from "../../../store/app/action_creators";
import store from "../../../store";
import { useTranslation } from 'react-i18next';

type TesMsg = {
    coin: string,
    hourTotal: number,
    price: number,
    rate: number | string,
    type: number
}
interface Props {
    data: Array<TesMsg>,
    type?: number,
    closeDraw?: () => void,
    total: number
}
const TesAllList = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
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
                    ? <Empty description='暂无数据' />
                    : <PullToRefresh onRefresh={async () => {
                        await sleep(3000)
                        console.log('刷新了')
                    }} renderText={status => {
                        return <div>{statusRecord[status]}</div>
                    }}>
                        {props.data.length > 0 ? <ul>
                            {
                                props.data.map((el: TesMsg, index: number): ReactElement => {
                                    return (
                                        <li key={index} className={`${el.type === 1 ? 'up-color' : 'down-color'}`} onClick={() => {
                                            const action = upCurrency(el.coin);
                                            store.dispatch(action);
                                            const viewQu = (): void => {
                                                const action = upCurrentCoin(el);
                                                store.dispatch(action);
                                                history.push('/quotes-detail');
                                            }
                                            props.type === 1 ? viewQu() : props.closeDraw!();
                                        }}>
                                            <div className="list-public">
                                                <div className="coin-msg-hour">
                                                    <p>{el.coin}</p>
                                                    <p>24H{t('public.vol')}&nbsp;{el.hourTotal}</p>
                                                </div>
                                            </div>
                                            <div className="list-public">
                                                <p className="list-price">{Number(el.price).toFixed(4)}</p>
                                                <p className="list-rate">
                                                    {el.type === 1 ? '+' : '-'}
                                                    {el.rate}%
                                                </p>
                                            </div>
                                        </li>
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