import React,{ ReactNode, useEffect } from "react";
// import { useTranslation } from "react-i18next";
import HomeBanner from "./components/banner";
import HomeAdv from "./components/adv";
import './index.scss'
import HomeAssets from "./components/my_wallet";
import HomeHelp from "./components/help";
import HomeTexCard from "./components/tes_card";
import HomeTeslist from "./components/tes_list";
import { upFooterStatus } from "../../store/app/action_creators";
import store from "../../store";

interface Props{
    type?:string
}

// Logo
const NavLogo = () : React.ReactElement<ReactNode> => {
    return(
        <div className="nav-logo">
            <img src={require('../../assets/images/test.png')} alt="" />
        </div>
    )
}


const HomeIndex = (props:Props) : React.ReactElement<ReactNode> => {
    // const { t } = useTranslation();
    useEffect((): void => {
        const action = upFooterStatus(1);
        store.dispatch(action)
    }, []);
    return (
        <div className="home-index">
            <NavLogo/>
            {/* 轮播广告 */}
            <HomeBanner/>
            {/* 广告中心 */}
            <HomeAdv/>
            {/* 我的资产 */}
            <HomeAssets/>
            {/* 帮助 & 公告 */}
            <HomeHelp/>
            {/* 行情卡片 */}
            <HomeTexCard/>
            {/* 涨幅榜 */}
            <HomeTeslist/>
        </div>
    )
};

export default React.memo(HomeIndex);


