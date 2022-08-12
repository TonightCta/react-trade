import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import store from "../../../store";
import { upCurrency, upCurrentCoin } from "../../../store/app/action_creators";
import { useTranslation } from 'react-i18next';
import { DotLoading } from "antd-mobile";

interface TesMsg {
    coin: string,
    price: number,
    rate: number,
    type: number,
    yesterday_volume: number
}

const HomeTeslist = (props: { wsData: any }): ReactElement<ReactNode> => {
    const [TesListTwo, setEtsListTwo] = useState<TesMsg[]>([]);
    const UpView = async () => {
        props.wsData.sort((a: TesMsg, b: TesMsg) => {
            return b.rate - a.rate
        });
        setEtsListTwo(props.wsData);
    };
    useEffect(() => {
        UpView()
    },[props])
    const { t } = useTranslation();
    const history = useHistory();
    return (
        <div className="home-tes-list">
            {/* 涨幅榜 */}
            <p className="list-title">{t('public.up_list')}</p>
            {TesListTwo.length > 0 ? <ul>
                {
                    TesListTwo.map((el: TesMsg, index: number): ReactElement => {
                        return (
                            <li key={index} className={`${el.type === 1 ? 'up-color' : 'down-color'}`} onClick={() => {
                                const action = upCurrency(el.coin);
                                const actionCurrent = upCurrentCoin(el);
                                store.dispatch(actionCurrent);
                                store.dispatch(action);
                                history.push('/quotes-detail')
                            }}>
                                <div className="list-public">
                                    <p className="list-sort">{index + 1}</p>
                                    <div className="coin-msg-hour">
                                        <p>{el.coin}</p>
                                        <p>24H{t('public.vol')}&nbsp;{Number(el.yesterday_volume).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="list-public">
                                    <p className="list-price">{Number(el.price).toFixed(4)}</p>
                                    <p className="list-rate">
                                        {el.type === 1 ? '+' : ''}
                                        {Number(el.rate).toFixed(2)}%
                                    </p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul> : <div className="load-tes">
                <DotLoading color="#3370ff" />
            </div>}
        </div>
    )
};

export default HomeTeslist;