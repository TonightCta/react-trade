import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav';
import './index.scss'
import TesPriceMsg from "./components/price_msg";
import TesPriceK from "./components/price_k";
import TesDealMsg from "./components/deal_msg";
import TradeBtn from "./components/reade_btn";
import { useTranslation } from "react-i18next";


const TesDetail = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    const state = store.getState();
    return (
        <div className="tes-detail">
            <InnerNav leftArrow title={state.currency} withBorder/>
            {/* 价格信息 */}
            <TesPriceMsg t={t}/>
            {/* 价格K线图 */}
            <TesPriceK t={t}/>
            {/* 成交信息 */}
            <TesDealMsg t={t}/>
            {/* 交易按钮 */}
            <TradeBtn t={t}/>
        </div>
    )
};

export default TesDetail;