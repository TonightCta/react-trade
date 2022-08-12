import { ReactElement, ReactNode, useEffect, useState } from "react";
import { upFooterStatus } from "../../store/app/action_creators";
import { Tabs } from "antd-mobile";
import store from "../../store";
import './order.scss'
import InnerNav from '../../components/inner_nav/nav'
import OrderList from "../trade/components/order_list";
import FilterBox from "./components/filter_box";
import { useTranslation } from 'react-i18next';

type FilterVal = {
    coin: string,
    way: string,
    type: string,
    startTime: number | string,
    endTime: number | string
}
const TradeOrder = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [orderType,setOrderType] = useState<number>(1);
    const [filterVal, setFilterVal] = useState<FilterVal>({
        coin: '',
        way: '',
        type: '',
        startTime: '',
        endTime: ''
    })
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, []);
    return (
        <div className="trade-order">
            {/* 我的订单 */}
            <InnerNav title={t('public.mine_order')} leftArrow withBorder={true} />
            <div className="trade-type-inner">
                <Tabs style={{ '--title-font-size': '14px' }} onChange={(e) => {
                    setOrderType(Number(e))
                }}>
                    {/* 当前委托 */}
                    <Tabs.Tab title={t('public.now_mission')} key={1}></Tabs.Tab>
                    {/* 历史委托 */}
                    <Tabs.Tab title={t('public.before_mission')} key={2}></Tabs.Tab>
                </Tabs>
                <div className="filter-btn"><FilterBox setFilterVal={(val: FilterVal) => {
                    setFilterVal({
                        coin: val.coin[0] ? val.coin[0] : '',
                        way: val.way[0] ? val.way[0] : '',
                        type: val.type[0] ? val.type[0] : '',
                        startTime: val.startTime,
                        endTime: val.endTime
                    })
                }} /></div>
            </div>
            <OrderList
                type={orderType}
                tradeQu={filterVal!.coin}
                tradeWay={filterVal!.way}
                tradeType={filterVal.type}
                startTime={filterVal.startTime}
                endTime={filterVal.endTime} 
                t={t}
            />
        </div>
    )
};

export default TradeOrder;