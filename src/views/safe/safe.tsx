import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../components/inner_nav/nav';
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import { List } from "antd-mobile";
import './index.scss'
import { CheckShieldFill } from "antd-mobile-icons";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";


const SafeIndex = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const safeList = [
        {
            title: t('public.verify_card'),//实名认证
            url: '/auth-card'
        },
        {
            title: t('public.edit_login_pass'),//修改登录密码
            url: '/set-pass'
        },
        {
            title: t('public.assets_pass'),//资金密码
            url: '/assets-lock'
        }
    ]
    const history = useHistory();
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="safe-index">
            <InnerNav leftArrow title={t('public.safe_center')} />
            <div className="need-auth">
                <CheckShieldFill />
                <span>{t('public.security')}</span>
            </div>
            <div className="safe-list">
                <List style={{ '--border-top': '1px solid rgba(0,0,0,0)' }}>
                    {
                        safeList.map((el, index): ReactElement => {
                            return (
                                <List.Item onClick={() => {
                                    history.push(el.url)
                                }} key={index}>{el.title}</List.Item>
                            )
                        })
                    }
                </List>
            </div>
        </div>
    )
};

export default SafeIndex;