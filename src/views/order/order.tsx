import { ReactElement, ReactNode, useEffect } from "react";
import { upFooterStatus } from "../../store/app/action_creators";
import { Tabs,Dropdown,Popup } from "antd-mobile";
import store from "../../store";
import './order.scss'
import InnerNav from '../../components/inner_nav/nav'
import { FilterOutline } from "antd-mobile-icons";
import OrderList from "../trade/components/order_list";

const TradeOrder = (): ReactElement<ReactNode> => {
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, []);
    return (
        <div className="trade-order">
            <InnerNav title="我的订单" leftArrow withBorder={true}/>
            <div className="trade-type-inner">
                <Tabs style={{'--title-font-size':'14px'}}>
                    <Tabs.Tab title="当前委托" key={1}></Tabs.Tab>
                    <Tabs.Tab title="历史委托" key={2}></Tabs.Tab>
                </Tabs>
                <div className="filter-btn"><FilterOutline fontSize={16}/></div>
            </div>
            <OrderList type={2}/>
        </div>
    )
};

export default TradeOrder;