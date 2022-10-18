import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Swiper } from 'antd-mobile';
import { BannerListApi } from '../../../request/api'


const HomeBanner = (): React.ReactElement<ReactNode> => {
    const [colors, setColors] = useState<any[]>([
        {
            image:require('../../../assets/images/out/banner_1.png')
        },
        {
            image:require('../../../assets/images/out/banner_2.png')
        },
        {
            image:require('../../../assets/images/out/banner_3.png')
        },
    ]);
    // const getBannerList = async () => {
    //     const result = await BannerListApi();
    //     setColors(result.data)
    // };
    useEffect(() => {
        // getBannerList();
        return () => {
            setColors([]);
        }
    }, [])
    return (
        <div className="home-banner">
            <Swiper autoplay loop indicator={() => null}>
                {
                    colors.map((con, index): ReactElement<ReactNode> => {
                        return (
                            <Swiper.Item key={index}>
                                <div
                                    className="banner-items"
                                >
                                    <img src={con.image} alt="" />
                                    {/* <p>{con}</p> */}
                                </div>
                            </Swiper.Item>
                        )
                    })
                }
            </Swiper>
            <div className="ann-box">
                <div className="ann-left">
                    <p className="ann-icon">
                        <img src={require('../../../assets/images/out/out_icon.png')} alt="" />
                    </p>
                    <p>Happy Harvest Festival,win sharing gifts!</p>
                </div>
                <p className="ann-list-icon">
                    <img src={require('../../../assets/images/out/out_icon_2.png')} alt="" />
                </p>
            </div>
        </div>
    )
};

export default HomeBanner;