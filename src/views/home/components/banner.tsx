import React, { ReactElement, ReactNode } from "react";
import { Swiper } from 'antd-mobile'

const colors = [
    require('../../../assets/images/banner_1.png'),
    require('../../../assets/images/banner_2.png'),
];

const Items = colors.map((con,index): ReactElement<ReactNode> => {
    return (
        <Swiper.Item key={index}>
            <div
                className="banner-items"
            >
                <img src={con} alt="" />
                {/* <p>{con}</p> */}
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