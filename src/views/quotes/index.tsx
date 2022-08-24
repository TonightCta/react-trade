import React, { ReactNode } from "react";
import TesNav from "./components/tes_nav";
import TesTabs from "./components/tes_tabs";
import { useTranslation } from "react-i18next";
import './index.scss'

const QuotesIndex = (): React.ReactElement<ReactNode> => {
    const { t } = useTranslation();
    return (
        <div className="quotes-index">
            {/* 标题 */}
            <TesNav t={t} />
            {/* Tab切换 */}
            <TesTabs type={1} t={t} />
        </div>
    )
};

export default React.memo(QuotesIndex);