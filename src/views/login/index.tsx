import { ReactElement, ReactNode, useEffect, useState } from "react";
import store from "../../store";
import { setToken, upFooterStatus } from "../../store/app/action_creators";
import { NavLink, useHistory } from "react-router-dom";
import './index.scss';
import { CloseOutline, LockOutline, MailOutline } from "antd-mobile-icons";
import { Button, Toast } from "antd-mobile";
import { useTranslation } from 'react-i18next';
import { LoginApi } from '../../request/api';
import { upUserInfo } from '../../store/app/action_fn'
interface Props {
    from: string
}

const LoginIndex = (props: Props): ReactElement<ReactNode> => {
    const [inpMsg, setInpMsg] = useState({
        email: '',
        password: ''
    })
    const { t } = useTranslation();
    const history = useHistory();
    useEffect((): void => {
        const aciton = upFooterStatus(0);
        store.dispatch(aciton);
    }, []);
    const loginService = async () => {
        if (!inpMsg.email) {
            Toast.show(t('public.enter_email'));
            return;
        };
        if (!inpMsg.password) {
            Toast.show(t('public.enter_pass'));
            return;
        };
        const params = {
            account: inpMsg.email,
            password: inpMsg.password
        };
        const result = await LoginApi(params);
        const { code } = result;
        if (code != 200) {
            Toast.show(result.message);
            return;
        };
        const action = setToken(`${result.data.token_type} ${result.data.access_token}`);
        store.dispatch(action);

        const info = await upUserInfo();
        if (info.code !== 200) {
            Toast.show('登录异常，请稍后再试');
            return;
        };
        console.log(info);
        Toast.show('登录成功')
        history.push('/')
    }
    return (
        <div className="login-index">
            <div className="close-page">
                <CloseOutline fontSize={24} color="#333" onClick={() => {
                    history.goBack()
                }} />
                <NavLink to="/set-language"><img src={require('../../assets/images/language_icon.png')} alt="" /></NavLink>
            </div>
            <p className="page-remark">
                {/* 欢迎来到80年代 */}
                {t('public.welcome')}
            </p>
            <div className="login-box">
                <div className="box-public">
                    {/* 邮箱 */}
                    <p>{t('public.email')}</p>
                    <input type="text" value={inpMsg.email} onChange={(e) => {
                        setInpMsg({
                            ...inpMsg,
                            email: e.target.value
                        })
                    }} placeholder={t('public.enter_email')} />
                    <span><MailOutline color="#999" fontSize={18} /></span>
                </div>
                <div className="box-public">
                    {/* 登录密码 */}
                    <p>{t('public.login_pass')}</p>
                    <input type="password" value={inpMsg.password} onChange={(e) => {
                        setInpMsg({
                            ...inpMsg,
                            password: e.target.value
                        })
                    }} placeholder={t('public.login_pass')} />
                    <span><LockOutline color="#999" fontSize={18} /></span>
                </div>
                <p className="login-btn">
                    {/* 登录 */}
                    <Button color="primary" block onClick={() => {loginService()}}>{t('public.login')}</Button>
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