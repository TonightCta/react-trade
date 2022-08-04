import React,{ ReactNode } from "react";
import TradeNav from "./components/trade_nav";
import TradeOper from "./components/trade_oper";
import './index.scss'

const TradeIndex = () : React.ReactElement<ReactNode> => {
    return (
        <div className="trade-index">
            {/* 导航信息 */}
            <TradeNav/>
            {/* 交易模块 */}
            <TradeOper/>
        </div>
    )
};

export default TradeIndex;