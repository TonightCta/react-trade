import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import store from "../../../../store";
import { upFooterStatus } from "../../../../store/app/action_creators";
import { useTranslation } from "react-i18next";
import './index.scss'


const HelpDetail = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="help-detail">
            <InnerNav leftArrow title={t('public.help_detail')} />
            <div className="help-con">
                帮助中心详情
            </div>
        </div>
    )
};

export default HelpDetail;