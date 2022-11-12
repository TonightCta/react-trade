import { useEffect, useState, ReactNode, useRef } from "react";
import { useTranslation } from "react-i18next";
import store from "../../../store";
import { useHistory } from 'react-router-dom';

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
    }, [props.downIcon]);
    const history = useHistory();
    const mineAssets: number = store.getState().assets;
    return (
        <div className="nav-logo">
            <div className="logo-down">
                <img className="bibi-logo" src={require('../../../assets/images/home_new/logo.png')} alt="" />
                {showDown === 2 && <div className="down-icon" onClick={() => {
                    props.history.push('/download')
                }}>
                    <p>
                        <span className="iconfont icon-cangpeitubiao_xiazaipandiandanxiazaidayinmoban"></span>
                    </p>
                    <span>{t('public.download')}</span>
                </div>}
            </div>
            <div className="text-box">
                <div className={`text-box-left ${store.getState().language === 'vie' ? 'left-small' : ''}`}>
                    <p>
                        {t('asx.banner_text')}
                    </p>
                    <p>
                        {t('asx.banner_text_2')}
                    </p>
                </div>
                <div className="assets-box" onClick={() => {
                    history.push('/mine-assets')
                }}>
                    <p>
                        <img src={require('../../../assets/images/home_asx/assets_icon.png')} alt="" />
                        {t('public.assets')}
                    </p>
                    <p>{mineAssets}</p>
                    <p className="mask-uint">USDT</p>
                </div>
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