import { ReactElement, ReactNode, useEffect, useState } from "react";
import { DotLoading, Swiper } from "antd-mobile";

interface TesL {
    type: number,
    coin: string,
    price: number,
    rate: number,
    symbol?: string
}

const HomeTexCard = (props: { wsData: any }): ReactElement<ReactNode> => {
    const [TesList, setTesList] = useState<{ msg: TesL[] }[]>([]);
    useEffect(() => {
        QUVal()
    }, [props]);
    useEffect(() => {
        return () => {
            setTesList([])
        }
    }, [])
    const QUVal = async () => {
        const chunk = (arr: TesL[], size: number): TesL[][] => {
            return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
        }
        setTesList(chunk(props.wsData, 3).map(item => { return { msg: item } }));
    };
    const Items = TesList.map((el: any, index): ReactElement => {
        return (
            <Swiper.Item key={index}>
                <ul>
                    {
                        el?.msg.map((msg: TesL, indexS: number): ReactElement => {
                            return (
                                <li key={indexS} className={`${msg.type === 1 ? 'up-color' : 'down-color'}`}>
                                    <p className="coin-qu">{msg.coin}</p>
                                    <p className="coin-price">{Number(msg.price).toFixed(4)}</p>
                                    <p className="coin-rate">
                                        {msg.type === 1 ? '+' : ''}
                                        {msg.rate.toFixed(2)}%
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