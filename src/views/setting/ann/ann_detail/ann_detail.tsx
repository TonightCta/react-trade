import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../../components/inner_nav/nav'
import store from "../../../../store";
import { upFooterStatus } from "../../../../store/app/action_creators";
import { useTranslation } from "react-i18next";
import './index.scss'

const AnnDetail = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="ann-detail">
            <InnerNav leftArrow title={t('public.ann_detail')} />
            <div className="detail-box">
                公告详细信息
            </div>
        </div>
    )
};

export default AnnDetail;