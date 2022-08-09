import React, { ReactNode, useEffect } from "react";
import TradeNav from "./components/trade_nav";
import TradeOper from "./components/trade_oper";
import TradeOrder from "./components/trade_order";
import './index.scss';
import { upFooterStatus } from "../../store/app/action_creators";
import store from "../../store";
import { useTranslation } from "react-i18next";

const TradeIndex = (): React.ReactElement<ReactNode> => {
    const { t } = useTranslation();
    useEffect((): void => {
        const action = upFooterStatus(1);
        store.dispatch(action)
    }, []);
    return (
        <div className="trade-index">
            {/* 导航信息 */}
            <TradeNav t={t}/>
            {/* 交易模块 */}
            <TradeOper t={t}/>
            {/* 订单信息 */}
            <TradeOrder t={t}/>
        </div>
    )
};

export default TradeIndex;