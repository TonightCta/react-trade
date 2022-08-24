import { ReactElement, ReactNode } from "react";
import InnerNav from '../../../components/inner_nav/nav';
import UpFile from "./components/up_file";
import { useTranslation } from "react-i18next";
import './index.scss'


const AuthCard = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    return (
        <div className="auth-card">
            <InnerNav title={t('public.verify_card')} leftArrow={true} />
            <UpFile />
        </div>
    )
};

export default AuthCard;