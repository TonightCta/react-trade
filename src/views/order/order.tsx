import { ReactElement, ReactNode, useEffect, useState } from "react";
import { upFooterStatus } from "../../store/app/action_creators";
import { Tabs, Dropdown, Popup } from "antd-mobile";
import store from "../../store";
import './order.scss'
import InnerNav from '../../components/inner_nav/nav'
import OrderList from "../trade/components/order_list";
import FilterBox from "./components/filter_box";

type FilterVal = {
    coin: string,
    way: string,
    type: string,
    startTime: number | string,
    endTime: number | string
}
const TradeOrder = (): ReactElement<ReactNode> => {
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
            <InnerNav title="我的订单" leftArrow withBorder={true} />
            <div className="trade-type-inner">
                <Tabs style={{ '--title-font-size': '14px' }}>
                    <Tabs.Tab title="当前委托" key={1}></Tabs.Tab>
                    <Tabs.Tab title="历史委托" key={2}></Tabs.Tab>
                </Tabs>
                <div className="filter-btn"><FilterBox setFilterVal={(val: FilterVal) => {
                    setFilterVal({
                        coin: val.coin,
                        way: val.way,
                        type: val.type,
                        startTime: val.startTime,
                        endTime: val.endTime
                    })
                }} /></div>
            </div>
            <OrderList 
                type={2} 
                tradeQu={filterVal!.coin} 
                tradeWay={filterVal!.way} 
                tradeType={filterVal.type} 
                startTime={filterVal.startTime} 
                endTime={filterVal.endTime} />
        </div>
    )
};

export default TradeOrder;