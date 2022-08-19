import { ReactElement, ReactNode, useEffect, useState } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav'
import './index.scss'
import { Button, Toast } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { FeedBackApi } from '../../../request/api'


const FeedBack = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [feed, setFeed] = useState<string>('');
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
            <textarea value={feed} onChange={(e) => {
                setFeed(e.target.value)
            }} placeholder={t('public.feed_remark')}></textarea>
            <p>
                <Button color="primary" block onClick={async () => {
                    if (!feed) {
                        //请输入反馈内容
                        Toast.show(t('message.type_feedback'));
                        return;
                    }
                    const result = await FeedBackApi({ content: feed });
                    console.log(result);
                    const { code } = result;
                    if (code !== 200) {
                        Toast.show(result.message);
                        return;
                    };
                    //反馈成功
                    Toast.show(t('message.feed_success'));
                    setFeed('')
                }}>
                    {/* 提交 */}
                    {t('public.submit')}
                </Button>
            </p>
        </div>
    )
};

export default FeedBack;