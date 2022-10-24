import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from '../../components/inner_nav/nav';
import store from "../../store";
import { List } from "antd-mobile";
import './index.scss'
import { CheckShieldFill } from "antd-mobile-icons";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Item {
    title: string,
    url: string,
    isGo: boolean,
    extra?: string
}

const SafeIndex = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [accountMsg, setAccountMsg] = useState(store.getState().account);
    const storeChange = () => {
        store.subscribe(() => {
            setAccountMsg(store.getState().account);
        });
    };
    useEffect(() => {
        storeChange();
        return () => {
            storeChange();
        }
    },[])
    const [safeList, setSafeList] = useState<Item[]>([]);
    useEffect(() => {
        setSafeList([
            {
                title: t('public.verify_card'),//实名认证
                url: '/auth-card',
                isGo: accountMsg?.security?.kyc === 0 || accountMsg?.security?.kyc === 3 ? true : false,
                extra: accountMsg?.security?.kyc === 0 && t('public.un_auth') || accountMsg?.security?.kyc === 1 && t('public.had_auth') || accountMsg?.security?.kyc === 2 && t('public.auth_processing') || accountMsg?.security?.kyc === 3 && t('public.reject') || ''
            },
            {
                title: t('public.edit_login_pass'),//修改登录密码
                url: '/set-pass',
                isGo: true,
            },
            {
                title: t('public.assets_pass'),//资金密码
                url: '/assets-lock',
                isGo: true,
            }
        ]);
    }, [accountMsg])
    const history = useHistory();
    return (
        <div className="safe-index">
            <InnerNav leftArrow title={t('public.safe_center')} />
            {accountMsg?.security?.kyc !== 1 && <div className="need-auth">
                <CheckShieldFill />
                <span>{t('public.security')}</span>
            </div>}
            <div className="safe-list">
                <List style={{ '--border-top': '1px solid rgba(0,0,0,0)' }}>
                    {
                        safeList.map((el, index): ReactElement => {
                            return (
                                <List.Item extra={el.extra} onClick={() => {
                                    el.isGo && history.push(el.url)
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