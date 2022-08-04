import React, { ReactNode, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
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
}
const Footer = (): React.ReactElement<ReactNode> => {
    const history = useHistory();
    const [currentNav, setCurrentNav] = useState<string>('home')
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

    const changeNav = (_val: string) => {
        setCurrentNav(_val);
        navList.forEach((e: Nav) => {
            if (_val === e.key) {
                history.push(e.url)
            }
        })
    };
    return (
        <div className="footer-nav">
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

export default withRouter(Footer);