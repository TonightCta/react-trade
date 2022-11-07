import { FileOutline } from "antd-mobile-icons";
import { Tabs } from "antd-mobile";
import { useImperativeHandle, useRef, useState } from "react";
import OrderList from "./order_list";
import { withRouter, useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import React from "react";
import store from "../../../store";
import { setOrderType } from "../../../store/app/action_creators";

interface Props extends RouteComponentProps {
    t: any
}

const TradeOrder = React.forwardRef((props: Props, ref: any) => {
    const [orderType, setOrderTypeInner] = useState<number>(1);
    const order_list: any = useRef(null);
    const history = useHistory();
    useImperativeHandle(ref, () => ({
        test: 123
    }));
    return (
        <div className="trade_order">
            <div className="order-oper">
                <Tabs style={{ '--title-font-size': '14px' }} onChange={(e) => {
                    setOrderTypeInner(Number(e));
                    const action = setOrderType(Number(e));
                    store.dispatch(action);
                    order_list.current.uploadOrder(e)
                }}>
                    {/* 当前委托 */}
                    <Tabs.Tab title={props.t('public.now_mission')} key={1}></Tabs.Tab>
                    {/* 历史委托 */}
                    <Tabs.Tab title={props.t('public.before_mission')} key={2}></Tabs.Tab>
                </Tabs>
                <FileOutline fontSize={18} onClick={() => {
                    history.push('/trade-order')
                }} />
            </div>
            <OrderList ref={order_list} limit={5} t={props.t} />
        </div>
    )
});

export default withRouter(TradeOrder);