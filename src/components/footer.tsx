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
    const AREA : string | undefined = process.env.REACT_APP_AREA;
    const navList: Array<Nav> = [
        {
            key: 'home',
            title: t('public.page'),
            icon: <span className={`iconfont ${AREA == '66' ? 'icon-bianzu11' : 'icon-a-bianzu1'}`}></span>,
            // icon:<AppOutline/>,
            url: '/'
        },
        {
            key: 'quotes',
            title: t('public.quotes'),
            icon: <span className={`iconfont ${AREA == '66' ? 'icon-a-bianzu31' : 'icon-bianzu'}`}></span>,
            // icon:<HistogramOutline/>,
            url: '/quotes'
        },
        {
            key: 'trade',
            title: t('public.trade'),
            icon: <span className={`iconfont ${AREA == '66' ? 'icon-a-bianzu41' : 'icon-a-bianzu3' }`}></span>,
            // icon:<UnorderedListOutline/>,
            url: '/trade'
        },
        {
            key: 'mine',
            title: t('public.mine'),
            icon: <span className={`iconfont ${AREA == '66' ? 'icon-bianzu2' : 'icon-a-bianzu4'}`}></span>,
            // icon:<UserOutline/>,
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
    // }, [])
    return (
        <div className={`footer-nav ${showNav === 0 ? 'hidden-nav' : ''} ${process.env.REACT_APP_AREA == '66' ? 'th-footer' : ''}`}>
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