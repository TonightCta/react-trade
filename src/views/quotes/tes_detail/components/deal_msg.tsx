import { DownOutline, UpOutline } from "antd-mobile-icons";
import { t } from "i18next";
import { ReactElement, ReactNode, useEffect, useState } from "react";

import { DealMsg } from '../../../../utils/types'

interface Props {
    t: any,
    dealData: DealMsg,
}

const TesDealMsg = (props: Props): ReactElement<ReactNode> => {
    const ValDate = (_time: number): string => {
        const date = new Date(_time);
        const hour = date.getHours();
        const min = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes() + 1;
        const sec = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
        return `${hour}:${min}:${sec}`
    }
    const [dealT, setDealT] = useState<DealMsg[]>([]);
    const [showMore, setShowMore] = useState<number>(10);
    useEffect(() => {
        if (dealT.length >= showMore) {
            dealT.pop();
        };
        setDealT([props.dealData, ...dealT])
    }, [props, showMore]);
    useEffect(() => {
        showMore === 10 && setDealT(dealT.slice(0, dealT.length - 20));
    }, [showMore])
    useEffect(() => {
        return () => {
            setDealT([])
        }
    }, [])
    return (
        <div className="tes-deal-msg">
            <p className="deal-title">
                {/* 成交单 */}
                {props.t('public.deal_order')}
            </p>
            <ul className="deal-list">
                <li>
                    <p className="deal-date">
                        {/* 时间 */}
                        {props.t('public.time')}
                    </p>
                    <div className="deal-cen">
                        <p>
                            {/* 方向 */}
                            {props.t('public.way')}
                        </p>
                        <p>
                            {/* 价格 */}
                            {props.t('public.price')}
                        </p>
                    </div>
                    <p className="deal-num">
                        {/* 数量 */}
                        {props.t('public.num')}
                    </p>
                </li>
            </ul>
            <ul>
                {
                    dealT.map((el: DealMsg, index): ReactElement => {
                        return (
                            <li key={index}>
                                <p className="deal-date">{ValDate(el.dt)}</p>
                                <div className="deal-cen">
                                    <p className={`cen-type ${el.dc === 'BUY' ? 'buy-color' : 'sell-color'}`}>
                                        {el.dc === 'BUY' ? props.t('public.buy_in') : props.t('public.sell_out')}
                                    </p>
                                    <p>{Number(el.p).toFixed(2)}</p>
                                </div>
                                <p className="deal-num">{Number(el.q).toFixed(6)}</p>
                            </li>
                        )
                    })
                }
                <li className="show-more" onClick={() => {
                    setShowMore(showMore === 10 ? 30 : 10);
                }}>
                    {/* 展开 : 收起 */}
                    {showMore === 10 ? props.t('public.expand') : props.t('public.put')}{props.t('public.more')}
                    {showMore === 10 ? <DownOutline /> : <UpOutline />}
                </li>
            </ul>
        </div>
    )
};

export default TesDealMsg;