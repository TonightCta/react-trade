import { ReactElement, ReactNode, useEffect, useState } from "react";
import { DotLoading, Swiper } from "antd-mobile";
import { upCurrency, upCurrentCoin } from "../../../store/app/action_creators";
import store from "../../../store";
import { useHistory } from "react-router-dom"; 

interface TesL {
    type: number,
    coin: string,
    price: number,
    rate: number,
    symbol?: string,
    status: number,
    precision: number
}


const HomeTexCard = (props: { wsData: any }): ReactElement<ReactNode> => {
    const history = useHistory()
    const [TesList, setTesList] = useState<{ msg: TesL[] }[]>([]);
    const chunk = (arr: TesL[], size: number): TesL[][] => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
    }
    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('homeData') || '[]').length > 0 && TesList.length < 1) {
            const data = JSON.parse(sessionStorage.getItem('homeData') || '[]');
            const sourceData: any[] = [];
            data.forEach((item: any) => {
                if (item.status === 1) {
                    sourceData.push(item);
                }
            })
            setTesList(chunk(sourceData, 3).map(item => { return { msg: item } }));
        }
    }, [])
    useEffect(() => {
        if (props.wsData.length > 0) {
            QUVal()
        }
    }, [props]);
    useEffect(() => {
        return () => {
            setTesList([])
        }
    }, [])
    const QUVal = async () => {
        setTesList(chunk(props.wsData.sort((x:any,y:any) => { return x.id - y.id }), 3).map(item => { return { msg: item } }));
    };
    const Items = TesList.map((el: any, index): ReactElement => {
        return (
            <Swiper.Item key={index}>
                <ul>
                    {
                        el?.msg.map((msg: TesL, indexS: number): ReactElement => {
                            return (
                                <li key={indexS} className={`${msg.type === 1 ? 'up-color' : 'down-color'}`} onClick={() => {
                                    const action = upCurrency(msg.coin);
                                    const actionCurrent = upCurrentCoin(msg);
                                    store.dispatch(actionCurrent);
                                    store.dispatch(action);
                                    history.push('/quotes-detail')
                                }}>
                                    <p className="coin-qu">{msg.coin}</p>
                                    <p className="coin-price">{Number(msg.price).toFixed(msg.precision)}</p>
                                    <p className="coin-rate">
                                        {msg.type === 1 ? '+' : ''}
                                        {Number(msg.rate).toFixed(2)}%
                                        <img src={require(`../../../assets/images/home_asx/${msg.type === 1 ? 'up' : 'down'}.png`)} alt="" />
                                    </p>
                                </li>
                            )
                        })
                    }
                </ul>
            </Swiper.Item>
        )
    })
    return (
        <div className="home-tex-card" >
            {TesList.length > 0 ? <Swiper style={{
                '--track-padding': ' 0 0 28px',
            }}>{Items}</Swiper> : <div className="load-tes">
                <DotLoading color="#3370ff" />
            </div>}
        </div>
    )
};

export default HomeTexCard;