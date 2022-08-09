import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import { useHistory } from "react-router-dom";
import './index.scss';
import { CheckShieldOutline, CloseOutline, LockOutline, MailOutline } from "antd-mobile-icons";
import { Button } from "antd-mobile";
import { useTranslation } from 'react-i18next'
interface Props {
    from: string
}

const RegisterIndex = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [count, setCount] = useState<number>(60);
    const cbSaver: any = useRef();
    const timer = useRef<NodeJS.Timer>();
    cbSaver.current = () => {
        console.log(count)
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
    return (
        <div className="register-index">
            <div className="close-page">
                <CloseOutline fontSize={24} color="#333" onClick={() => {
                    history.goBack()
                }} />
                <img src={require('../../assets/images/language_icon.png')} alt="" />
            </div>
            <p className="page-remark">
                {/* 注册80年代 */}
                {t('public.regis_welcome')}
            </p>
            <div className="login-box">
                <div className="box-public">
                    <p>
                        {/* 邮箱 */}
                        {t('public.email')}
                    </p>
                    <input type="text" placeholder={t('public.enter_email')} />
                    <span><MailOutline color="#999" fontSize={18} /></span>
                </div>
                <div className="box-public">
                    <p>
                        {/* 邮箱验证码 */}
                        {t('public.email_code')}
                    </p>
                    <input type="text" placeholder={t('public.enter_code')} />
                    <span><CheckShieldOutline color="#999" fontSize={18} /></span>
                    <p className={`send-code ${count === 60 ? '' : 'gra-btn'}`} onClick={count === 60 ? () => {
                        countDown()
                    } : () => { }}>
                        {count === 60 ? t('public.send_code') : `${count}s${t('public.send_code')}`}
                    </p>
                </div>
                <div className="box-public">
                    <p>
                        {/* 登录密码 */}
                        {t('public.login_pass')}
                    </p>
                    <input type="password" placeholder={t('public.enter_pass')} />
                    <span><LockOutline color="#999" fontSize={18} /></span>
                </div>
                <p className="login-btn">
                    <Button color="primary" block>
                        {/* 立即注册 */}
                        {t('public.regis_now')}
                    </Button>
                </p>
            </div>
        </div>
    )
};

export default RegisterIndex;