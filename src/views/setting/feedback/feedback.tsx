import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav'
import './index.scss'
import { Button } from "antd-mobile";
import { useTranslation } from "react-i18next";


const FeedBack = (): ReactElement<ReactNode> => {
    const { t } = useTranslation()
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action);
    }, [])
    return (
        <div className="feed-back">
            <InnerNav leftArrow title={t('public.feedback')} />
            <img src={require('../../../assets/images/feed_icon.png')} alt="" />
            <p>
                {/* 反馈内容 */}
                {t('public.feed_con')}
            </p>
            <textarea placeholder={t('public.feed_remark')}></textarea>
            <p>
                <Button color="primary" block>
                    {/* 提交 */}
                    {t('public.submit')}
                </Button>
            </p>
        </div>
    )
};

export default FeedBack;