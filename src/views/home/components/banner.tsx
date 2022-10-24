import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Swiper } from 'antd-mobile';
import { BannerListApi } from '../../../request/api'


const HomeBanner = (): React.ReactElement<ReactNode> => {
    const [colors, setColors] = useState<any[]>([
        {
            // image:''
        }
    ]);
    const getBannerList = async () => {
        const result = await BannerListApi();
        setColors(result.data);
    };
    useEffect(() => {
        getBannerList();
        return () => {
            setColors([]);
        }
    }, [])
    return (
        <div className="home-banner">
            <Swiper autoplay loop>
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
        </div>
    )
};

export default HomeBanner;