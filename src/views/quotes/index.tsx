import React,{ ReactNode, useEffect } from "react";
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import TesNav from "./components/tes_nav";
import TesTabs from "./components/tes_tabs";
import { useTranslation } from "react-i18next";
import './index.scss'

const QuotesIndex = () : React.ReactElement<ReactNode> => {
    const { t } = useTranslation();
    useEffect((): void => {
        const action = upFooterStatus(1);
        store.dispatch(action)
    }, []);
    return(
        <div className="quotes-index">
            {/* 标题 */}
            <TesNav t={t}/>
            {/* Tab切换 */}
            <TesTabs type={1} t={t}/>
        </div>
    )
};

export default React.memo(QuotesIndex);