import { ReactElement, ReactNode } from "react";
import InnerNav from '../../../components/inner_nav/nav';
import './index.scss'
import SetLock from "./components/set_lock";
import { useTranslation } from "react-i18next";

const AssetsLock = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    return (
        <div className="assets-lock">
            {/* 资金密码 */}
            <InnerNav leftArrow title={t('public.assets_pass')} />
            <SetLock />
        </div>
    )
};

export default AssetsLock;