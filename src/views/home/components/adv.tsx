import { Swiper } from "antd-mobile";
import React, { ReactElement, ReactNode } from "react";
import { SoundOutline } from 'antd-mobile-icons'
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const advList = [
    '派大星',
    '海绵宝宝',
    '章鱼哥'
];

interface CardMsg {
    title: string,
    icon: string,
    url: string,
    outSide:boolean,
}

// 广告轮播
const Items = advList.map((el, index): ReactElement<ReactNode> => {
    return (
        <Swiper.Item className="adv-item" key={index}>
            <NavLink to="/ann-detail">{el}</NavLink>
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
    const { t } = useTranslation();
    const history = useHistory();
    const list: Array<CardMsg> = [
        {
            title: t('public.inv'),
            icon: require('../../../assets/images/home_icon_1.png'),
            url: '',
            outSide:false,
        },
        {
            title: t('public.quotes'),
            icon: require('../../../assets/images/home_icon_2.png'),
            url: '/quotes',
            outSide:false,
        },
        {
            title: t('public.customer'),
            icon: require('../../../assets/images/home_icon_3.png'),
            url: 'https://www.baidu.com',
            outSide:true,
        },
        {
            title: t('public.set'),
            icon: require('../../../assets/images/setting_icon.png'),
            url: '/setting',
            outSide:false,
        }
    ]
    return (
        <div className="card-list">
            <ul>
                {
                    list.map((el, index): ReactElement => {
                        return (
                            <li key={index} onClick={() => {
                                el.outSide ? window.open(el.url) : history.push(el.url)
                            }}>
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