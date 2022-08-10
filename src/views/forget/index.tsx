import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import { NavLink, useHistory } from "react-router-dom";
import './index.scss';
import { CheckShieldOutline, CloseOutline, LockOutline, MailOutline } from "antd-mobile-icons";
import { Button, Toast } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { SendCodeApi, ForgetPassApi } from '../../request/api';

interface Props {
    from: string
}
interface InpMsg {
    email: string,
    code: string | number,
    newPass: string,
    repeatPass: string
}

const ForgetIndex = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [count, setCount] = useState<number>(60);
    const cbSaver: any = useRef();
    const timer = useRef<NodeJS.Timer>();
    const [inpMsg, setInpMsg] = useState<InpMsg>({
        email: '',
        code: '',
        newPass: '',
        repeatPass: ''
    })
    cbSaver.current = () => {
        setCount(count - 1);
    };
    const countDown = useCallback((): void => {
        timer.current = setInterval(() => {
            cbSaver.current();
        }, 1000);
    }, []);

    useEffect(() => {
        if (count < 0) {
            clearInterval(timer.current);
            setCount(60)
        };
    }, [count]);

    useEffect(() => {
        return () => {
            clearInterval(timer.current);
        }
    }, []);
    const history = useHistory();
    useEffect((): void => {
        const aciton = upFooterStatus(0);
        store.dispatch(aciton);
    }, []);
    //发送验证码
    const sendCodeService = async () => {
        if (!inpMsg.email) {
            Toast.show(t('public.enter_email'));
            return;
        };
        const params = {
            scene: 2,
            type: 2,
            email: inpMsg.email
        };
        const result = await SendCodeApi(params);
        const { code } = result;
        if (code !== 200) {
            Toast.show(result.message);
            return;
        };
        Toast.show(t('message.send_code_success'));
        countDown();
    };
    const resetPassService = async () => {
        if (!inpMsg.email) {
            Toast.show(t('public.enter_email'));
            return;
        };
        if (!inpMsg.code) {
            Toast.show(t('public.enter_code'));
            return
        };
        if (!inpMsg.newPass) {
            Toast.show(t('public.enter_new_pass'));
            return;
        };
        if (inpMsg.newPass.length < 8) {
            Toast.show(t('public.last_8'));
            return;
        };
        if (!inpMsg.repeatPass) {
            Toast.show(t('public.type_turn'));
            return;
        };
        if (inpMsg.repeatPass !== inpMsg.newPass) {
            Toast.show(t('message.pass_failed'));
            return;
        };
        const params = {
            type: 2,
            email: inpMsg.email,
            password: inpMsg.newPass,
            password_confirmation: inpMsg.repeatPass,
            code: inpMsg.code
        };
        const result = await ForgetPassApi(params);
        const { code } = result;
        if (code !== 200) {
            Toast.show(result.message);
            return;
        };
        Toast.show(t('message.reset_success'));
        history.push('/login')
    }
    return (
        <div className="forget-pass">
            <div className="close-page">
                <CloseOutline fontSize={24} color="#333" onClick={() => {
                    history.goBack()
                }} />
                <NavLink to="/set-language"><img src={require('../../assets/images/language_icon.png')} alt="" /></NavLink>
            </div>
            {/* 忘记密码 */}
            <p className="page-remark">{t('public.forget')}</p>
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
                    {/* 邮箱验证码 */}
                    <p>{t('public.email_code')}</p>
                    <input type="text" value={inpMsg.code} onChange={(e) => {
                        setInpMsg({
                            ...inpMsg,
                            code: e.target.value
                        })
                    }} placeholder={t('public.enter_code')} />
                    <span><CheckShieldOutline color="#999" fontSize={18} /></span>
                    <p className={`send-code ${count === 60 ? '' : 'gra-btn'}`} onClick={count === 60 ? () => {
                        sendCodeService();
                    } : () => { }}>
                        {/* 发送验证码 */}
                        {count === 60 ? t('public.send_code') : `${count}s${t('public.send_code')}`}
                    </p>
                </div>
                <div className="box-public">
                    {/* 新密码 */}
                    <p>{t('public.new_pass')}</p>
                    <input type="password" value={inpMsg.newPass} onChange={(e) => {
                        setInpMsg({
                            ...inpMsg,
                            newPass: e.target.value
                        })
                    }} placeholder={t('public.enter_new_pass')} />
                    <span><LockOutline color="#999" fontSize={18} /></span>
                </div>
                <div className="box-public">
                    {/* 确认密码 */}
                    <p>{t('public.turn_pass')}</p>
                    <input type="password" value={inpMsg.repeatPass} onChange={(e) => {
                        setInpMsg({
                            ...inpMsg,
                            repeatPass: e.target.value
                        })
                    }} placeholder={t('public.type_turn')} />
                    <span><LockOutline color="#999" fontSize={18} /></span>
                </div>
                <p className="login-btn">
                    {/* 重置密码 */}
                    <Button color="primary" block onClick={() => { resetPassService() }}>{t('public.reset_pass')}</Button>
                </p>
            </div>
        </div>
    )
};

export default ForgetIndex;