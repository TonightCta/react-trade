import { FileOutline } from "antd-mobile-icons";
import { Tabs } from "antd-mobile";
import { ReactElement, ReactNode } from "react";
import OrderList from "./order_list";
import { withRouter,useHistory } from "react-router-dom";

const TradeOrder = (): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="trade_order">
            <div className="order-oper">
                <Tabs style={{ '--title-font-size': '14px' }}>
                    <Tabs.Tab title="当前委托" key={1}></Tabs.Tab>
                    <Tabs.Tab title="历史委托" key={2}></Tabs.Tab>
                </Tabs>
                <FileOutline fontSize={18} onClick={() => {
                    console.log(123)
                    history.push('/trade-order')
                }} />
            </div>
            <OrderList type={1}/>
        </div>
    )
};

export default withRouter(TradeOrder);