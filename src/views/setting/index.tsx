import { ReactElement, ReactNode } from "react";
import InnerNav from '../../components/inner_nav/nav';
import { Button, List } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './index.scss';



const SetIndex = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
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
            //${process.env.REACT_APP_SHARE}/PrivacyPolicy.html
            title: t('public.protocol'),
            url: '',
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
                                    const protocol: string =
                                        process.env.REACT_APP_LAND == '1' &&
                                        'https://sites.google.com/view/terms-of-use2privacy-policy' ||
                                        process.env.REACT_APP_LAND == '3' &&
                                        'https://sites.google.com/view/yd-exchange-privacy-policy' ||
                                        `${process.env.REACT_APP_SHARE}/PrivacyPolicy.html`;
                                    el.url ? history.push(el.url) : window.open(protocol)
                                }} key={index}>{el.title}</List.Item>
                            )
                        })
                    }
                </List>
            </div>
            <Button color="primary" block onClick={() => {
                window.localStorage.removeItem('account');
                window.localStorage.removeItem('token_1');
                window.sessionStorage.clear();
                history.push('/')
            }}>
                {/* 退出登录 */}
                {t('public.login_out')}
            </Button>
        </div>
    )
};

export default SetIndex;