import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../components/inner_nav/nav';
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import { Button, List } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './index.scss';



const SetIndex = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    const setList = [
        {
            title: t('title.language_set'),//语言设置`
            url: '/set-language'
        },
        {
            title: t('public.feedback'),//意见反馈
            url: '/feedback'
        },
        {
            title: t('public.ann'),//公告
            url: '/ann'
        },
        {
            title: t('public.help'),//帮助
            url: '/help'
        },
        {
            title: t('public.about_us'),//关于我们
            url: '/about-us'
        },
    ]
    return (
        <div className="set-index">
            <InnerNav leftArrow title={t('public.set_center')} />
            <div className="set-list">
                <List style={{ '--border-top': '1px solid rgba(0,0,0,0)' }}>
                    {
                        setList.map((el, index): ReactElement => {
                            return (
                                <List.Item onClick={() => {
                                    history.push(el.url)
                                }} key={index}>{el.title}</List.Item>
                            )
                        })
                    }
                </List>
            </div>
            <Button color="primary" block>
                {/* 退出登录 */}
                {t('public.login_out')}
            </Button>
        </div>
    )
};

export default SetIndex;