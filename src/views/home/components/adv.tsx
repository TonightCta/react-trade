import { Swiper } from "antd-mobile";
import React, { ReactElement, ReactNode } from "react";
import { SoundOutline } from 'antd-mobile-icons'

const advList = [
    '派大星',
    '海绵宝宝',
    '章鱼哥'
];

interface CardMsg {
    title: string,
    icon: string,
    url: string,
}

// 广告轮播
const Items = advList.map((el, index): ReactElement<ReactNode> => {
    return (
        <Swiper.Item className="adv-item" key={index}>
            {el}
        </Swiper.Item>
    )
});

const AdvSwiper = (): ReactElement<ReactNode> => {
    return (
        <div className="adv-banner">
            <Swiper loop autoplay direction='vertical' style={{ '--height': '34px' }}>
                {Items}
            </Swiper>
        </div>
    )
}

//卡片选项

const Card = (): ReactElement<ReactNode> => {
    const list: Array<CardMsg> = [
        {
            title: '邀请',
            icon: require('../../../assets/images/banner_1.png'),
            url: '',
        },
        {
            title: '行情',
            icon: require('../../../assets/images/banner_2.png'),
            url: '',
        },
        {
            title: '法币',
            icon: require('../../../assets/images/banner_3.png'),
            url: '',
        },
        {
            title: '客服',
            icon: require('../../../assets/images/banner_4.png'),
            url: '',
        }
    ]
    return (
        <div className="card-list">
            <ul>
                {
                    list.map((el, index): ReactElement => {
                        return (
                            <li key={index}>
                                <img src={el.icon} alt="" />
                                <p>{el.title}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const HomeAdv = (): ReactElement<ReactNode> => {
    return (
        <div className="home-adv-card">
            <div className="home-adv">
                <SoundOutline fontSize={16} />
                <AdvSwiper />
            </div>
            <Card />
        </div>
    )
};

export default HomeAdv;