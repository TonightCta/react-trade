import React, { ReactNode, useEffect, useState } from "react";
import { withRouter, useHistory, RouteComponentProps, useLocation } from "react-router-dom";
// import store from "../store";
import { TabBar } from 'antd-mobile';
import { useTranslation } from "react-i18next";
import './footer.scss';


interface Nav {
    key: string | number,
    title: string,
    icon: React.ReactElement,
    url: string,
};
interface Props extends RouteComponentProps {
    show?: number | string
}


const Footer = (props: Props): React.ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const AREA : string | undefined = process.env.REACT_APP_LAND;
    const navList: Array<Nav> = [
        {
            key: 'home',
            title: t('public.page'),
            icon: <span className={`iconfont ${AREA == '1' && 'icon-bianzu11' || AREA == '2' && 'icon-a-bianzu1' || AREA == '3' && 'icon-bianzu3' || AREA == '4' && 'icon-bianzu21'}`}></span>,
            url: '/'
        },
        {
            key: 'quotes',
            title: t('public.quotes'),
            icon: <span className={`iconfont ${AREA == '1' && 'icon-a-bianzu31' || AREA == '2' && 'icon-bianzu' || AREA == '3' && 'icon-a-bianzu11' || AREA == '4' && 'icon-a-bianzu21'}`}></span>,
            url: '/quotes'
        },
        {
            key: 'trade',
            title: t('public.trade'),
            icon: <span className={`iconfont ${AREA == '1' && 'icon-a-bianzu41' || AREA == '2' && 'icon-a-bianzu3' || AREA == '3' && 'icon-a-bianzu2' || AREA == '4' && 'icon-a-bianzu42'}`}></span>,
            url: '/trade'
        },
        {
            key: 'mine',
            title: t('public.mine'),
            icon: <span className={`iconfont ${AREA == '1' && 'icon-bianzu2' || AREA == '2' && 'icon-a-bianzu4' || AREA == '3' && 'icon-a-bianzu32' || AREA == '4' && 'icon-a-bianzu311'}`}></span>,
            url: '/mine'
        },
    ];
    const location = useLocation();
    //获取路由变化
    useEffect(() => {
        switch (location.pathname) {
            case "/home":
                setCurrentNav('home');
                break;
            case "/quotes":
                setCurrentNav('quotes');
                break;
            case "/trade":
                setCurrentNav('trade');
                break;
            case "/mine":
                setCurrentNav('mine');
                break;
            default:
                setCurrentNav('home');
        }
    }, [location]);
    //更新导航显示信息
    const [showNav, setShowNav] = useState<number>(location.pathname === '/home' || location.pathname === '/quotes' || location.pathname === '/trade' || location.pathname === '/mine' ? 1 : 0);
    // store.subscribe((): void => {
    //     setShowNav(Number(store.getState().footerStatus))
    // });
    const win: any = window;
    const setStatus = (_type: number) => {
        setShowNav(_type)
    };
    win.setStatus = setStatus;
    const history = useHistory();
    //更新导航选中Key
    const [currentNav, setCurrentNav] = useState<string>('home')
    const changeNav = (_val: string) => {
        setCurrentNav(_val);
        navList.forEach((e: Nav) => {
            if (_val === e.key) {
                history.push(e.url)
            }
        })
    };
    // useEffect(() => {
    //     if (location.pathname === '/home' || location.pathname === '/quotes' || location.pathname === '/trade' || location.pathname === '/mine') {
    //         setShowNav(1)
    //     } else {
    //         setShowNav(0)
    //     }
    // }, []);
    const LAND : string | undefined = process.env.REACT_APP_LAND;
    return (
        <div className={`footer-nav ${showNav === 0 ? 'hidden-nav' : ''} ${LAND == '1' && 'th-footer' || LAND == '3' && 'new-footer' || LAND == '4' && 'asx-footer'}`}>
            <TabBar activeKey={currentNav} onChange={(key: string): void => {
                changeNav(key)
            }}>
                {navList.map((item: Nav) => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    )
};

export default React.memo(withRouter(Footer));