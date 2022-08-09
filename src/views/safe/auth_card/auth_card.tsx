import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../components/inner_nav/nav';
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import UpFile from "./components/up_file";
import { useTranslation } from "react-i18next";
import './index.scss'


const AuthCard = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="auth-card">
            <InnerNav title={t('public.verify_card')} leftArrow={true} />
            <UpFile />
        </div>
    )
};

export default AuthCard;