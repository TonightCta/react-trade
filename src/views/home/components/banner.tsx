import React, { ReactElement, ReactNode } from "react";
import { Swiper } from 'antd-mobile'

const colors = [
    '我是如此古板的山', 
    '我是如此模糊的雾', 
    '飞鸟与鱼不同路', 
];

const Items = colors.map((con,index): ReactElement<ReactNode> => {
    return (
        <Swiper.Item key={index}>
            <div
                className="banner-items"
            >
                {/* <img src={con} alt="" /> */}
                <p>{con}</p>
            </div>
        </Swiper.Item>
    )
})

const HomeBanner = (): React.ReactElement<ReactNode> => {
    return (
        <div className="home-banner">
            <Swiper autoplay loop>{Items}</Swiper>
        </div>
    )
};

export default HomeBanner;