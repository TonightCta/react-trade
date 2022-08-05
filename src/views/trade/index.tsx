import React, { ReactNode, useEffect } from "react";
import TradeNav from "./components/trade_nav";
import TradeOper from "./components/trade_oper";
import TradeOrder from "./components/trade_order";
import './index.scss';
import { upFooterStatus } from "../../store/app/action_creators";
import store from "../../store";

const TradeIndex = (): React.ReactElement<ReactNode> => {
    useEffect((): void => {
        const action = upFooterStatus(1);
        store.dispatch(action)
    }, []);
    return (
        <div className="trade-index">
            {/* 导航信息 */}
            <TradeNav />
            {/* 交易模块 */}
            <TradeOper />
            {/* 订单信息 */}
            <TradeOrder />
        </div>
    )
};

export default TradeIndex;