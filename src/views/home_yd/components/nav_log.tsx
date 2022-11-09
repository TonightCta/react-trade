import { useEffect, useState, ReactNode, useRef } from "react";
import { useTranslation } from "react-i18next";

// Logo
const NavLogo = (props: { history: any, downIcon: number }): React.ReactElement<ReactNode> => {
    const [showDown, setShowdown] = useState<number>(props.downIcon);
    const { t } = useTranslation();
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
                <img className="bibi-logo" src={require('../../../assets/images/home_new/logo.png')} alt="" />
                {showDown === 2 && <div className="down-icon" onClick={() => {
                    props.history.push('/download')
                }}>
                    <span className="iconfont icon-xiazai-2"></span>
                    <span>{t('public.download')}</span>
                </div>}
            </div>
            {/* <div className="play-video-btn" onClick={() => {
                setVideoBox(true)
            }}>
                <div className="btn-inner">
                    <p className="iconfont icon-bofangqi-bofang"></p>
                </div>
            </div> */}
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