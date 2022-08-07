import { ReactElement, ReactNode } from "react";
import { useHistory } from 'react-router-dom'
import store from "../../../store";
import { upCurrency } from "../../../store/app/action_creators";

interface TesMsg {
    coin: string,
    hourTotal: number,
    price: number,
    rate: number | string,
    type: number
}

const TesListTwo: Array<TesMsg> = [
    {
        coin: 'LINK/USDT',
        hourTotal: 117942431.4324,
        price: 7.5333,
        rate: 3.42,
        type: 1,
    },
    {
        coin: 'OMG/USDT',
        hourTotal: 74054191.9941,
        price: 2.2122,
        rate: 1.99,
        type: 1,
    },
    {
        coin: 'XMR/USDT',
        hourTotal: 973129.6788,
        price: 161.201,
        rate: 1.68,
        type: 0,
    },
    {
        coin: 'EOS/USDT',
        hourTotal: 114702681.3521,
        price: 136.65,
        rate: 1.66,
        type: 1,
    },
    {
        coin: 'NEO/USDT',
        hourTotal: 125181923.0395,
        price: 0.507001,
        rate: 1.33,
        type: 1,
    },
]

const HomeTeslist = (): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="home-tes-list">
            <p className="list-title">涨幅榜</p>
            <ul>
                {
                    TesListTwo.map((el: TesMsg, index: number): ReactElement => {
                        return (
                            <li key={index} className={`${el.type === 1 ? 'up-color' : 'down-color'}`} onClick={() => {
                                const action = upCurrency(el.coin);
                                store.dispatch(action);
                                history.push('/quotes-detail')
                            }}>
                                <div className="list-public">
                                    <p className="list-sort">{index + 1}</p>
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
        </div>
    )
};

export default HomeTeslist;