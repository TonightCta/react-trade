import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import { useHistory } from "react-router-dom";
import './index.scss';
import { CheckShieldOutline, CloseOutline, LockOutline, MailOutline } from "antd-mobile-icons";
import { Button } from "antd-mobile";
import { useTranslation } from "react-i18next";
interface Props {
    from: string
}

const ForgetIndex = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [count, setCount] = useState<number>(60);
    const cbSaver: any = useRef();
    const timer = useRef<NodeJS.Timer>();
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
    }, [])
    return (
        <div className="forget-pass">
            <div className="close-page">
                <CloseOutline fontSize={24} color="#333" onClick={() => {
                    history.goBack()
                }} />
                <img src={require('../../assets/images/language_icon.png')} alt="" />
            </div>
            {/* 忘记密码 */}
            <p className="page-remark">{t('public.forget')}</p>
            <div className="login-box">
                <div className="box-public">
                    {/* 邮箱 */}
                    <p>{t('public.email')}</p>
                    <input type="text" placeholder={t('public.enter_email')} />
                    <span><MailOutline color="#999" fontSize={18} /></span>
                </div>
                <div className="box-public">
                    {/* 邮箱验证码 */}
                    <p>{t('public.email_code')}</p>
                    <input type="text" placeholder={t('public.enter_code')} />
                    <span><CheckShieldOutline color="#999" fontSize={18} /></span>
                    <p className={`send-code ${count === 60 ? '' : 'gra-btn'}`} onClick={count === 60 ? () => {
                        countDown()
                    } : () => { }}>
                        {/* 发送验证码 */}
                        {count === 60 ? t('public.send_code') : `${count}s${t('public.send_code')}`}
                    </p>
                </div>
                <div className="box-public">
                    {/* 新密码 */}
                    <p>{t('public.new_pass')}</p>
                    <input type="password" placeholder={t('public.enter_new_pass')} />
                    <span><LockOutline color="#999" fontSize={18} /></span>
                </div>
                <div className="box-public">
                    {/* 确认密码 */}
                    <p>{t('public.turn_pass')}</p>
                    <input type="password" placeholder={t('public.type_turn')} />
                    <span><LockOutline color="#999" fontSize={18} /></span>
                </div>
                <p className="login-btn">
                    {/* 重置密码 */}
                    <Button color="primary" block>{t('public.reset_pass')}</Button>
                </p>
            </div>
        </div>
    )
};

export default ForgetIndex;