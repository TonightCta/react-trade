import { useEffect, useState, ReactNode, useRef } from "react";
import { useTranslation } from "react-i18next";
import store from "../../../store";

// Logo
const NavLogo = (props: { history: any, downIcon: number }): React.ReactElement<ReactNode> => {
    const [showDown, setShowdown] = useState<number>(props.downIcon);
    const { t } = useTranslation();
    const { language } = store.getState();
    //视频播放器
    const [videoBox, setVideoBox] = useState<boolean>(false);
    //视频源
    const videoRef: any = useRef(null);
    useEffect(() => {
        videoBox ? videoRef.current?.play() : videoRef.current?.pause();
    }, [videoBox])
    useEffect(() => {
        setShowdown(props.downIcon)
    }, [props.downIcon])
    return (
        <div className="nav-logo">
            <div className="logo-down">
                <img className="bibi-logo" src={require('../../../assets/images/th_logo.png')} alt="" />
                {/* showDown === 2 &&  */}
                {showDown === 2 && <div className="down-icon" onClick={() => {
                    props.history.push('/download')
                }}>
                    <img src={require('../../../assets/images/down_icon_th.png')} alt="" />
                    <span>{t('public.download')}</span>
                </div>}
            </div>
            {/* text */}
            <div className="text-banner">
                <div className={`${language === 'en' ? 'en-text-inner' : ''}`}>
                    <p>
                        {t('public.banner_th_title')}<img src={require('../../../assets/images/th_banner_text.png')} alt="" />
                    </p>
                    <p>{t('public.banner_th')}</p>
                </div>
                <img className="right-earth" src={require('../../../assets/images/banner_th.png')} alt="" />
                <img className="play-video" onClick={() => {
                    setVideoBox(true);
                }} src={require('../../../assets/images/play_video.png')} alt="" />
            </div>
            {videoBox && <div className="video-box">
                <div className="video-mask"></div>
                <video src="https://bibiotc.oss-ap-southeast-1.aliyuncs.com/files/b6a135617ce75ddba34873a62204fbfd.mp4" ref={videoRef} controls />
                <p className="iconfont icon-close" onClick={() => {
                    setVideoBox(false)
                }}></p>
            </div>}
        </div>
    )
};

export default NavLogo;