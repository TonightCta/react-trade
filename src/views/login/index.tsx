import { ReactElement, ReactNode, useEffect, useState } from "react";
import store from "../../store";
import { setToken, setWSSToken } from "../../store/app/action_creators";
import { NavLink, useHistory } from "react-router-dom";
import './index.scss';
import { CloseOutline, LockOutline, MailOutline, RightOutline } from "antd-mobile-icons";
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
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const loginService = async () => {
        if (!inpMsg.email) {
            Toast.show(t('message.enter_email_phone'));
            return;
        };
        if (!inpMsg.password) {
            Toast.show(t('public.enter_pass'));
            return;
        };
        setLoading(true)
        const params = {
            account: inpMsg.email,
            password: inpMsg.password
        };
        const result = await LoginApi(params);
        setLoading(false)
        const { code } = result;
        if (code != 200) {
            Toast.show(result.message);
            return;
        };
        const action = setToken(`${result.data.token_type} ${result.data.access_token}`);
        store.dispatch(action);

        const info = await upUserInfo();
        const { data } = info;
        const actionWss = setWSSToken(data.quotation.wss_token);
        store.dispatch(actionWss);
        if (info.code !== 200) {
            //登录异常，请稍后再试
            Toast.show(t('message.login_faild'));
            return;
        };
        //登录成功
        Toast.show(t('message.login_success'))
        history.push('/')
    }
    return (
        <div className="login-index">
            <div className="int-bg-box"></div>
            <div className="up-bg-box">
                <div className="close-page">
                    <CloseOutline fontSize={24} color="#333" onClick={() => {
                        history.goBack()
                    }} />
                    <div className="language-box">
                        <NavLink to="/set-language"><img src={require(`../../assets/images/${store.getState().language}.png`)} alt="" /></NavLink>
                        <RightOutline fontSize={12} color="#5B646F" />
                    </div>
                </div>
                <div className="page-remark">
                    <img src={require('../../assets/images/int_logo.png')} alt="" />
                    <p>{t('public.welcome')}</p>
                </div>
                <div className="login-box">
                    <div className="box-public">
                        {/* 邮箱 & 手机 */}
                        <p>
                            {/* Email or mobile number */}
                            {t('public.email_or_phone')}
                        </p>
                        <input type="text" value={inpMsg.email} onChange={(e) => {
                            setInpMsg({
                                ...inpMsg,
                                email: e.target.value
                            })
                        }} placeholder={t('public.enter_email_phone')} />
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
                        <Button color="primary" loading={loading} disabled={loading} block onClick={() => { loginService() }}>{t('public.login')}</Button>
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
        </div>
    )
};

export default LoginIndex;