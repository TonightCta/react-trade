import React,{ ReactNode } from "react";
import TesNav from "./components/tes_nav";
import TesTabs from "./components/tes_tabs";
import './index.scss'

const QuotesIndex = () : React.ReactElement<ReactNode> => {
    return(
        <div className="quotes-index">
            {/* 标题 */}
            <TesNav/>
            {/* Tab切换 */}
            <TesTabs type="1"/>
        </div>
    )
};

export default React.memo(QuotesIndex);