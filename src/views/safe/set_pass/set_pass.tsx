import { ReactElement, ReactNode } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import ResetPass from "./components/re_set";
import './index.scss'
import { useTranslation } from "react-i18next";
const SetPass = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    return (
        <div className="set-pass">
            <InnerNav title={t('public.login_pass')} leftArrow />
            <ResetPass />
        </div>
    )
};

export default SetPass;