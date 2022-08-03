import React,{ ReactNode, useState } from "react";
import { AtTabBar } from "taro-ui";
import './footer.scss';

interface Nav{
    title:string,
    iconType:string,
    url:string,
}
const Footer = () : React.ReactElement<ReactNode> => {
    const [currentNav,setCurrent] = useState(0);
    const navList : Array<Nav> = [
        {
            title:'首页',
            iconType:'bullet-list',
            url:'/'
        },
        {
            title:'行情',
            iconType:'bullet-list',
            url:'/'
        },
        {
            title:'交易',
            iconType:'bullet-list',
            url:'/'
        },
        {
            title:'法币',
            iconType:'bullet-list',
            url:'/'
        },
        {
            title:'我的',
            iconType:'bullet-list',
            url:'/mine'
        },
    ];
    const navClick = (value:Nav) : void => {

    }
    return (
        <>
            {/* @ts-ignore */}
            <AtTabBar tabList={navList} current={currentNav} onClick={() => {
                navClick.bind(this)
            }}/>
        </>
    )
};

export default Footer;