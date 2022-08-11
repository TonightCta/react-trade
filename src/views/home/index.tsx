import React, { ReactNode, useCallback, useEffect, useState } from "react";
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
import { upUserAssets } from '../../store/app/action_fn'
import { QUList } from "../../request/api";
import { sendWs, getMessage } from '../../utils/ws'
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


const HomeIndex = (props: Props): React.ReactElement<ReactNode> => {
    const [wsList, setWsList] = useState<any>([]);
    const [token, setToken] = useState<string | null>(sessionStorage.getItem('token_1'));
    store.subscribe(() => {
        setToken(store.getState().appToken)
    })
    // const { t } = useTranslation();

    const UpView = async () => {
        const result = await QUList();
        let arr: any[] = [];
        for (let i in result.data.list) {
            arr.push(result.data.list[i])
        };
        arr.forEach(e => {
            sendWs({
                e: 'subscribe',
                d: {
                    symbol: e.symbol,
                    interval: '1m'
                }
            });
        });
        getMessage().message.onmessage = ((e: any) => {
            const wsData = JSON.parse(e.data)
            let arrVal: any[] = arr;

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
            });
            setWsList(arrVal);
        });
    };
    useEffect(() => {
        const action = upFooterStatus(1);
        store.dispatch(action);
        token && upUserAssets();
        setTimeout(() => {
            UpView()
        }, 500);
        return () => {
            setWsList([])
        }
    }, []);
    const cancelWS = async () => {
        const result = await QUList();
        for (let i in result.data.list) {
            sendWs({
                e: 'unsubscribe',
                d: {
                    symbol: result.data.list[i].symbol,
                    interval: '1m'
                }
            });
        }
    };
    useEffect(() => {
        return () => {
            cancelWS()
        }
    }, [])
    return (
        <div className="home-index">
            <NavLogo />
            {/* 轮播广告 */}
            <HomeBanner />
            {/* 广告中心 */}
            <HomeAdv />
            {/* 我的资产 */}
            <HomeAssets />
            {/* 帮助 & 公告 */}
            <HomeHelp />
            {/* 行情卡片 */}
            <HomeTexCard wsData={wsList} />
            {/* 涨幅榜 */}
            <HomeTeslist wsData={wsList} />
        </div>
    )
};

export default HomeIndex;


