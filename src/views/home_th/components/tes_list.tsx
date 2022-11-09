import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import store from "../../../store";
import { setUnCoin, upCurrency, upCurrentCoin } from "../../../store/app/action_creators";
import { useTranslation } from 'react-i18next';
import { DotLoading } from "antd-mobile";

interface TesMsg {
    coin: string,
    price: number,
    rate: number,
    type: number,
    yesterday_volume: number,
    symbol: string,
    status: number,
    precision: number,
    target: string,
    base: string,
    logo:string
}

const HomeTeslist = (props: { wsData: any }): ReactElement<ReactNode> => {
    const [TesListTwo, setEtsListTwo] = useState<TesMsg[]>([]);
    const UpView = () => {
        props.wsData.sort((a: TesMsg, b: TesMsg) => {
            return b.rate - a.rate
        });
        const ar: TesMsg[] = [];
        props.wsData.forEach((e: TesMsg) => {
            if (e.status === 1 && ar.length < 5) {
                ar.push(e)
            }
        });
        setEtsListTwo(ar);
    };
    useEffect(() => {
        if (props.wsData.length > 0) {
            UpView()
        }
    }, [props]);

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('homeData') || '[]')
        if (data.length > 0) {
            data.sort((a: TesMsg, b: TesMsg) => {
                return b.rate - a.rate
            });
            const ar: TesMsg[] = [];
            data.forEach((e: TesMsg) => {
                if (e.status === 1 && ar.length < 5) {
                    ar.push(e)
                }
            });
            setEtsListTwo(ar);
        }
    }, []);

    const { t } = useTranslation();
    const history = useHistory();
    return (
        <div className="home-tes-list">
            {/* 涨幅榜 */}
            <p className="list-title">
                <span>{t('public.up_list')}</span>
                <span></span>
            </p>
            {TesListTwo.length > 0 ? <ul>
                {
                    TesListTwo.map((el: TesMsg, index: number): ReactElement => {
                        return (
                            <div key={index}>
                                {
                                    el.status == 1 && <li key={index} className={`${el.type === 1 ? 'up-color' : 'down-color'}`} onClick={() => {
                                        const action = upCurrency(el.coin);
                                        const actionCurrent = upCurrentCoin(el);
                                        store.dispatch(actionCurrent);
                                        store.dispatch(action);
                                        history.push('/quotes-detail')
                                    }}>
                                        <div className="list-public">
                                            {/* <p className="list-sort">{index + 1}</p> */}
                                            <div className="coin-msg-hour">
                                                <div className="coin-icon">
                                                    {
                                                        el.logo 
                                                            ? <img src={el.logo} alt="" />
                                                            : <img src={require('../../../assets/images/default_avatar.png')} alt="" />
                                                    }
                                                </div>
                                                <div className="coin-msg">
                                                    <p>{el.base}<span>/{el.target}</span></p>
                                                    <p>24H {t('public.vol')}&nbsp;{Number(el.yesterday_volume).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-public">
                                            <p className="list-price">{Number(el.price).toFixed(el.precision)}</p>
                                            <p className="list-rate">
                                                {el.type === 1 ? '+' : ''}
                                                {Number(el.rate).toFixed(2)}%
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
            </div>
            }
        </div >
    )
};

export default HomeTeslist;