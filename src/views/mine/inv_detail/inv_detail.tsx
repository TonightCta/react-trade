import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import './index.scss'
import { upFooterStatus } from "../../../store/app/action_creators";
import { useTranslation } from "react-i18next";

const InvDetail = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, []);
    const level = store.getState().invLevel;
    return (
        <div className="inv-detail">
            <InnerNav leftArrow={true} title={t('public.detail')} withBorder={true} />
            <div className="white-content">
                <p className="level-title">
                    Level&nbsp;{level === 4 ? 'Total' : level}&nbsp;-&nbsp;{t('public.detail')}
                </p>
                <div className="inv-msg">
                    <p>
                        {/* 受邀者总数 */}
                        {t('public.inv_total')}
                    </p>
                    <p><span>0</span>
                        {/* 人 */}
                        {t('public.people')}
                    </p>
                </div>
                <p className="inv-date">
                    {/* 截止至 */}
                    {
                        t('public.wen_wait')
                    }
                    &nbsp;2022/8/4 16:54:13</p>
            </div>
        </div>
    )
};

export default InvDetail;