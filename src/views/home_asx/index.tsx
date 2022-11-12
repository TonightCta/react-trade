//越南首页


import React, { ReactNode, useEffect, useReducer, useState } from "react";
// import { useTranslation } from "react-i18next";
// import HomeBanner from "./components/banner";
// import HomeAdv from "./components/adv";
import './index.scss'
import HomeAssets from "./components/my_wallet";
// import HomeHelp from "./components/help";
import HomeTexCard from "./components/tes_card";
import HomeTeslist from "./components/tes_list";
import { setHomeData } from "../../store/app/action_creators";
import store from "../../store";
import { upUserAssets } from '../../store/app/action_fn'
import { WSDataType } from "../../utils/state";
import { useHistory } from 'react-router-dom'
import HomeCard from "./components/card";
import { addListener, removeListener } from "../../utils/hooks";
import { initWsSubscribe, subscribeReducer } from '../../redurce/set_subscribe'
import NavLogo from "./components/nav_log";




const HomeIndexAsx = (): React.ReactElement<ReactNode> => {
    const [state, dispatch] = useReducer(subscribeReducer, [], initWsSubscribe);
    const [localQU, setLocalQU] = useState<any[]>(store.getState().quList);
    const [downIcon, setDownIcon] = useState<number>(store.getState().downApp)
    const history = useHistory();
    const storeChange = () => {
        store.subscribe(() => {
            setLocalQU(store.getState().quList);
            setDownIcon(store.getState().downApp);
        });
    };
    const onMessageHome = (e: any) => {
        let arr: any[] = localQU;
        try {
            const wsData = JSON.parse(e.data);
            if (wsData.e === 'subscribe') {
                arr.forEach(item => {
                    if (wsData.s === item.symbol) {
                        item.price = wsData.k.c;
                    }
                });
                arr = arr.map(item => {
                    const rate = (item.price - item.yesterday_price) / item.yesterday_price * 100
                    return {
                        ...item,
                        rate: rate,
                        type: rate > 0 ? 1 : 0,
                        coin: `${item.base}/${item.target}`
                    }
                });
                dispatch({
                    type: WSDataType.SET_WSS_SUBSCRIBE,
                    payload: { wsSubscribe: arr }
                });
            }

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        storeChange();
        let arrVal: any[] = [];
        arrVal = store.getState().quList;
        const arrValTw = arrVal.map(item => {
            const rate = (item.price - item.yesterday_price) / item.yesterday_price * 100
            return {
                ...item,
                rate: rate,
                type: rate > 0 ? 1 : 0,
                coin: `${item.base}/${item.target}`
            }
        });
        const action = setHomeData(arrValTw);
        store.dispatch(action);
        dispatch({
            type: WSDataType.SET_WSS_SUBSCRIBE,
            payload: { wsSubscribe: arrValTw }
        });
        addListener(onMessageHome);
    }, [localQU])
    useEffect(() => {
        if (localStorage.getItem('token_1')) {
            upUserAssets();
        }
        return () => {
            removeListener(onMessageHome);
            storeChange();
            setLocalQU([]);
        }
    }, []);
    return (
        <div className="home-index-asx">
            <NavLogo history={history} downIcon={downIcon} />
            {/* 轮播广告 */}
            {/* <HomeBanner /> */}
            {/* 广告中心 */}
            {/* <HomeAdv /> */}
            {/* 行情卡片 */}
            <HomeTexCard wsData={state.wsSubscribe} />
            {/* 操作卡片 */}
            <HomeCard history={history} />
            {/* 我的资产 */}
            <HomeAssets />
            {/* 帮助 & 公告 */}
            {/* <HomeHelp /> */}
            {/* 涨幅榜 */}
            <HomeTeslist wsData={state.wsSubscribe} />
        </div>
    )
};

export default HomeIndexAsx;


