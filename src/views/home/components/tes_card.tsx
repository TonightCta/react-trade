import { ReactElement, ReactNode } from "react";
import { Swiper } from "antd-mobile";

const TesList = [
    {
        msg: [
            {
                coin: 'BTC/USDT',
                price: "23133.835",
                type: 1,
                rate: '0.83',
            },
            {
                coin: 'BCH/USDT',
                price: "134.71",
                type: 1,
                rate: '0.07',
            },
            {
                coin: 'BSV/USDT',
                price: "61.2182",
                type: 0,
                rate: '0.87',
            }
        ]
    },
    {
        msg: [
            {
                coin: 'ETH/USDT',
                price: "1637.835",
                type: 1,
                rate: '0.53',
            },
            {
                coin: 'ETC/USDT',
                price: "36.7361",
                type: 0,
                rate: '0.35',
            },
            {
                coin: 'TRX/USDT',
                price: "0.0686",
                type: 0,
                rate: '0.32',
            }
        ]
    },
];

const Items = TesList.map((el, index): ReactElement => {
    return (
        <Swiper.Item key={index}>
            <ul>
                {
                    el.msg.map((msg, indexS): ReactElement => {
                        return (
                            <li key={indexS} className={`${msg.type === 1 ? 'up-color' : 'down-color'}`}>
                                <p className="coin-qu">{msg.coin}</p>
                                <p className="coin-price">{msg.price}</p>
                                <p className="coin-rate">
                                    {msg.type === 1 ? '+' : '-'}
                                    {msg.rate}%
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
        </Swiper.Item>
    )
})

const HomeTexCard = (): ReactElement<ReactNode> => {
    return (
        <div className="home-tex-card" >
            <Swiper style={{
              '--track-padding': ' 0 0 28px',
            }}>{Items}</Swiper>
        </div>
    )
};

export default HomeTexCard;