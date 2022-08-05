import { ReactElement, ReactNode } from "react";
import { DotLoading, PullToRefresh } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import { PullStatus } from 'antd-mobile/es/components/pull-to-refresh';
import { useHistory } from 'react-router-dom'

type TesMsg = {
    coin: string,
    hourTotal: number,
    price: number,
    rate: number | string,
    type: number
}
interface Props {
    data: Array<TesMsg>,
    type?: number | string
}

const statusRecord: Record<PullStatus, ReactElement | string> = {
    pulling: '再拉再拉',
    canRelease: '拉拉得了',
    refreshing: <DotLoading color='primary' />,
    complete: '好啦',
}
const TesAllList = (props: Props): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="tes-all-list">
            <PullToRefresh onRefresh={async () => {
                await sleep(3000)
                console.log('刷新了')
            }} renderText={status => {
                return <div>{statusRecord[status]}</div>
            }}>
                <ul>
                    {
                        props.data.map((el: TesMsg, index: number): ReactElement => {
                            return (
                                <li key={index} className={`${el.type === 1 ? 'up-color' : 'down-color'}`} onClick={() => {
                                    console.log();
                                    props.type === 1 && history.push('/quotes-detail')
                                }}>
                                    <div className="list-public">
                                        <div className="coin-msg-hour">
                                            <p>{el.coin}</p>
                                            <p>24H量&nbsp;{el.hourTotal.toFixed(4)}</p>
                                        </div>
                                    </div>
                                    <div className="list-public">
                                        <p className="list-price">{el.price.toFixed(4)}</p>
                                        <p className="list-rate">
                                            {el.type === 1 ? '+' : '-'}
                                            {el.rate}%
                                        </p>
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

export default TesAllList;