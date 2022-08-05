import React, { ReactNode, useEffect, useState } from "react";
import { withRouter, useHistory, RouteComponentProps,useLocation } from "react-router-dom";
import store from "../store";
import { TabBar } from 'antd-mobile';
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

const navList: Array<Nav> = [
    {
        key: 'home',
        title: '首页',
        icon: <AppOutline />,
        url: '/'
    },
    {
        key: 'quotes',
        title: '行情',
        icon: <MessageOutline />,
        url: '/quotes'
    },
    {
        key: 'trade',
        title: '交易',
        icon: <UnorderedListOutline />,
        url: '/trade'
    },
    {
        key: 'mine',
        title: '我的',
        icon: <UserOutline />,
        url: '/mine'
    },
];
const Footer = (props: Props): React.ReactElement<ReactNode> => {
    const location = useLocation();
    //获取路由变化
    useEffect(() => {
        switch (location.pathname){
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
    },[location]);
    //更新导航显示信息
    const [showNav, setShowNav] = useState<number>(Number(sessionStorage.getItem('footerStatus'))) || 1;
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