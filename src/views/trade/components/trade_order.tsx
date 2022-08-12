import { FileOutline } from "antd-mobile-icons";
import { Tabs } from "antd-mobile";
import { ReactElement, ReactNode, useRef, useState } from "react";
import OrderList from "./order_list";
import { withRouter, useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
    t: any
}

const TradeOrder = (props: Props): ReactElement<ReactNode> => {
    const [orderType, setOrderType] = useState<number>(1);
    const order_list : any = useRef(null);
    const history = useHistory();
    return (
        <div className="trade_order">
            <div className="order-oper">
                <Tabs style={{ '--title-font-size': '14px' }} onChange={(e) => {
                    setOrderType(Number(e))
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
            <OrderList ref={order_list} type={orderType} limit={5} t={props.t} />
        </div>
    )
};

export default withRouter(TradeOrder);