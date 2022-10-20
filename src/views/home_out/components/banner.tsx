import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { Swiper } from 'antd-mobile';
import { AdvListApi, BannerListApi } from '../../../request/api'
import { ADV } from "../../../utils/types";
import { upAnnID } from "../../../store/app/action_creators";
import store from "../../../store";


const HomeBanner = (props:{history:any}): React.ReactElement<ReactNode> => {
    const [advList, setAdvList] = useState<ADV[]>([]);
    const [colors, setColors] = useState<any[]>([
        // {
        //     image:require('../../../assets/images/out/banner_1.png')
        // },
        // {
        //     image:require('../../../assets/images/out/banner_2.png')
        // },
        // {
        //     image:require('../../../assets/images/out/banner_3.png')
        // },
    ]);
    const getBannerList = async () => {
        const result = await BannerListApi();
        setColors(result.data);
        const adv = await AdvListApi(3);
        setAdvList(adv.data.lists);
    };
    useEffect(() => {
        getBannerList();
        return () => {
            setColors([]);
        }
    }, []);
    //视频播放器
    const [videoBox, setVideoBox] = useState<boolean>(false);
    //视频源
    const [videoSource, setVideoSource] = useState<string>('');
    const videoRef: any = useRef(null);
    useEffect(() => {
        videoBox ? videoRef.current?.play() : videoRef.current?.pause();
    }, [videoBox])
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
                                    {con.video ? <img onClick={() => {
                                        setVideoSource(con.image);
                                        setVideoBox(true);
                                    }} src={require('../../../assets/images/video_poster.png')} /> : <img src={con.image} alt="" />}
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
                    <div className="ann-swiper">
                        <Swiper direction='vertical' autoplay loop indicator={() => null}>
                            {
                                advList.map((item: ADV, index: number): ReactElement => {
                                    return (
                                        <Swiper.Item key={index}>
                                            <p onClick={() => {
                                                const action = upAnnID(item.id);
                                                store.dispatch(action);
                                                props.history.push('/ann-detail')
                                            }}>{item.title}</p>
                                        </Swiper.Item>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>
                <p className="ann-list-icon" onClick={() => {
                    props.history.push('/ann');
                }}>
                    <img src={require('../../../assets/images/out/out_icon_2.png')} alt="" />
                </p>
            </div>
            {videoBox && <div className="video-box">
                <div className="video-mask"></div>
                <video src={videoSource} ref={videoRef} controls />
                <p className="iconfont icon-close" onClick={() => {
                    setVideoBox(false)
                }}></p>
            </div>}
        </div>
    )
};

export default HomeBanner;