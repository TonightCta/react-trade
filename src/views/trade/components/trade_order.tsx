import { FileOutline } from "antd-mobile-icons";
import { Tabs } from "antd-mobile";
import { ReactElement, ReactNode } from "react";
import OrderList from "./order_list";
import { withRouter, useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
    t: any
}

const TradeOrder = (props: Props): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="trade_order">
            <div className="order-oper">
                <Tabs style={{ '--title-font-size': '14px' }}>
                    {/* 当前委托 */}
                    <Tabs.Tab title={props.t('public.now_mission')} key={1}></Tabs.Tab>
                    {/* 历史委托 */}
                    <Tabs.Tab title={props.t('public.before_mission')} key={2}></Tabs.Tab>
                </Tabs>
                <FileOutline fontSize={18} onClick={() => {
                    history.push('/trade-order')
                }} />
            </div>
            <OrderList type={1} t={props.t} />
        </div>
    )
};

export default withRouter(TradeOrder);