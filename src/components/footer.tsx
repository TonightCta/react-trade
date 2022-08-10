import React, { ReactNode, useEffect, useState } from "react";
import { withRouter, useHistory, RouteComponentProps, useLocation } from "react-router-dom";
import store from "../store";
import { TabBar } from 'antd-mobile';
import { useTranslation } from "react-i18next";
import './footer.scss';
import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'

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
    const navList: Array<Nav> = [
        {
            key: 'home',
            title: t('public.page'),
            icon: <AppOutline />,
            url: '/'
        },
        {
            key: 'quotes',
            title: t('public.quotes'),
            icon: <MessageOutline />,
            url: '/quotes'
        },
        {
            key: 'trade',
            title: t('public.trade'),
            icon: <UnorderedListOutline />,
            url: '/trade'
        },
        {
            key: 'mine',
            title: t('public.mine'),
            icon: <UserOutline />,
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
    const [showNav, setShowNav] = useState<number>(Number(localStorage.getItem('footerStatus'))) || 1;
    store.subscribe((): void => {
        setShowNav(Number(store.getState().footerStatus))
    });
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
    return (
        <div className={`footer-nav ${showNav === 0 ? 'hidden-nav' : ''}`}>
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