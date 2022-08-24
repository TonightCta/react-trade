import React, { ReactNode, useEffect, useReducer, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
import HomeBanner from "./components/banner";
import HomeAdv from "./components/adv";
import './index.scss'
import HomeAssets from "./components/my_wallet";
import HomeHelp from "./components/help";
import HomeTexCard from "./components/tes_card";
import HomeTeslist from "./components/tes_list";
import { setHomeData } from "../../store/app/action_creators";
import store from "../../store";
// import { upUserAssets } from '../../store/app/action_fn'
import { WSDataType } from "../../utils/state";
import { useHistory } from 'react-router-dom'
import HomeCard from "./components/card";
import { addListener, removeListener } from "../../utils/hooks";
import { initWsSubscribe, subscribeReducer } from '../../redurce/set_subscribe'

interface Props {
    type?: string
}

// Logo
const NavLogo = (): React.ReactElement<ReactNode> => {
    return (
        <div className="nav-logo">
            <img src={require('../../assets/images/logo.png')} alt="" />
        </div>
    )
}


const HomeIndex = (): React.ReactElement<ReactNode> => {

    const [state, dispatch] = useReducer(subscribeReducer, [], initWsSubscribe);

    const history = useHistory();
    useEffect(() => {
        const onMessageHome = (e: any) => {
            try {
                const wsData = JSON.parse(e.data);
                if (wsData.e === 'subscribe') {
                    let arrVal: any[] = store.getState().quList;
                    arrVal.forEach(item => {
                        if (wsData.s === item.symbol) {
                            item.price = wsData.k.c;
                        }
                    });
                    arrVal = arrVal.map(item => {
                        const rate = (item.price - item.yesterday_price) / item.yesterday_price * 100
                        return {
                            ...item,
                            rate: rate,
                            type: rate > 0 ? 1 : 0,
                            coin: `${item.base}/${item.target}`
                        }
                    }).sort((x: any, y: any) => {
                        return x.id - y.id
                    })
                    // console.log(arrVal.sort((x:any,y:any) => { return x.id - y.id }),'top')
                    const action = setHomeData(arrVal);
                    store.dispatch(action);
                    dispatch({
                        type: WSDataType.SET_WSS_SUBSCRIBE,
                        payload: { wsSubscribe: arrVal }
                    });
                    // setTimeout(() => {
                    //     setWsList(arrVal);
                    // })
                }

            } catch (err) {
                console.log(err)
            }
        }
        addListener(onMessageHome)
        return () => {
            removeListener(onMessageHome)
        }
    }, []);
    return (
        <div className="home-index">
            <NavLogo />
            {/* 轮播广告 */}
            <HomeBanner />
            {/* 广告中心 */}
            <HomeAdv />
            {/* 行情卡片 */}
            <HomeTexCard wsData={state.wsSubscribe} />
            {/* 操作卡片 */}
            <HomeCard history={history} />
            {/* 我的资产 */}
            <HomeAssets />
            {/* 帮助 & 公告 */}
            <HomeHelp />
            {/* 涨幅榜 */}
            <HomeTeslist wsData={state.wsSubscribe} />
        </div>
    )
};

export default HomeIndex;


