import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import { useHistory } from "react-router-dom";
import './index.scss';
import { CloseOutline, LockOutline, MailOutline } from "antd-mobile-icons";
import { Button } from "antd-mobile";
import { useTranslation } from 'react-i18next'
interface Props {
    from: string
}

const LoginIndex = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    useEffect((): void => {
        const aciton = upFooterStatus(0);
        store.dispatch(aciton);
        console.log(props)
    }, [])
    return (
        <div className="login-index">
            <div className="close-page">
                <CloseOutline fontSize={24} color="#333" onClick={() => {
                    history.goBack()
                }} />
                <img src={require('../../assets/images/language_icon.png')} alt="" />
            </div>
            <p className="page-remark">
                {/* 欢迎来到80年代 */}
                {t('public.welcome')}
            </p>
            <div className="login-box">
                <div className="box-public">
                    {/* 邮箱 */}
                    <p>{t('public.email')}</p>
                    <input type="text" placeholder={t('public.enter_email')} />
                    <span><MailOutline color="#999" fontSize={18} /></span>
                </div>
                <div className="box-public">
                    {/* 登录密码 */}
                    <p>{t('public.login_pass')}</p>
                    <input type="password" placeholder={t('public.login_pass')} />
                    <span><LockOutline color="#999" fontSize={18} /></span>
                </div>
                <p className="login-btn">
                    {/* 登录 */}
                    <Button color="primary" block>{t('public.login')}</Button>
                </p>
                <p className="register-btn">
                    <span onClick={() => { history.push('/register') }}>
                        {/* 立即注册 */}
                        {t('public.regis_now')}
                    </span>
                    <span onClick={() => { history.push('/forget') }}>{t('public.forget')}?</span>
                </p>
            </div>
        </div>
    )
};

export default LoginIndex;