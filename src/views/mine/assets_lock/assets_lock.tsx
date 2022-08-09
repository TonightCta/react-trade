import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../components/inner_nav/nav';
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import './index.scss'
import SetLock from "./components/set_lock";
import { useTranslation } from "react-i18next";

const AssetsLock = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="assets-lock">
            {/* 资金密码 */}
            <InnerNav leftArrow title={t('public.assets_pass')} />
            <SetLock/>
        </div>
    )
};

export default AssetsLock;