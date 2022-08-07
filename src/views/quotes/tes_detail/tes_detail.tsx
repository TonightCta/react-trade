import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav';
import './index.scss'
import TesPriceMsg from "./components/price_msg";
import TesPriceK from "./components/price_k";
import TesDealMsg from "./components/deal_msg";
import TradeBtn from "./components/reade_btn";


const TesDetail = (): ReactElement<ReactNode> => {
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    const state = store.getState();
    return (
        <div className="tes-detail">
            <InnerNav leftArrow title={state.currency} withBorder/>
            {/* 价格信息 */}
            <TesPriceMsg/>
            {/* 价格K线图 */}
            <TesPriceK/>
            {/* 成交信息 */}
            <TesDealMsg/>
            {/* 交易按钮 */}
            <TradeBtn/>
        </div>
    )
};

export default TesDetail;