import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Button, Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TradePassApi, SendCodeApi } from '../../../../request/api';
import { upUserInfo } from '../../../../store/app/action_fn'
import store from "../../../../store";

interface Inp {
    loginPassword: string,
    code: string,
    tradePass: string,
    turnPass: string,
}

const SetLock = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
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
    const [inpMsg, setInpMsg] = useState<Inp>({
        loginPassword: '',
        code: '',
        tradePass: '',
        turnPass: ''
    });
    const sendCodeService = async () => {
        const result = await SendCodeApi({
            scene: 4,
            type: store.getState().account.email ? 2 : 1,
            email:store.getState().account.email,
            phone:store.getState().account.phone,
            phone_prefix:store.getState().account.phone_prefix
        });
        const { code } = result;
        if(code !== 200){
            Toast.show(result.message);
            return;
        }
        Toast.show(t('message.send_code_success'));
        countDown()
    }
    const submitSetTradePass = async () => {
        if (!inpMsg.loginPassword) {
            //请输入登录密码
            Toast.show(t('public.enter_login_pass'));
            return;
        }
        if (!inpMsg.tradePass) {
            // 请输入交易密码
            Toast.show(t('public.enter_tarde_pass'));
            return;
        };
        if(!inpMsg.code){
            Toast.show(t('public.enter_code'));
            return;
        }
        if (inpMsg.tradePass.length < 8) {
            // 交易密码至少8位
            Toast.show(t('public.last_trade_8'));
            return;
        }
        if (!inpMsg.turnPass) {
            //请再次输入交易密码
            Toast.show(t('public.type_turn_trade'));
            return;
        }
        if (inpMsg.tradePass !== inpMsg.turnPass) {
            //两次密码不一致
            Toast.show(t('message.pass_faild'));
            return;
        };
        const params = {
            code:inpMsg.code,
            login_password: inpMsg.loginPassword,
            password: inpMsg.tradePass,
            password_confirmation: inpMsg.turnPass
        };
        const result = await TradePassApi(params);
        const { code } = result;
        if (code !== 200) {
            Toast.show(result.message);
            return
        };
        await upUserInfo();
        Toast.show(t('public.edit_success'));
        history.goBack()
    }
    return (
        <div className="set-lock">
            <div className="form-item">
                {/* 登录密码 */}
                <p>{t('public.login_pass')}</p>
                <input type="password" value={inpMsg.loginPassword} onChange={(e) => {
                    setInpMsg({
                        ...inpMsg,
                        loginPassword: e.target.value
                    })
                }} placeholder={t('public.enter_login_pass')} />
            </div>
            <div className="form-item">
                {/* 登录密码 */}
                <p>{t('public.email_code')}</p>
                <input type="password" value={inpMsg.code} onChange={(e) => {
                    setInpMsg({
                        ...inpMsg,
                        code: e.target.value
                    })
                }} placeholder={t('public.enter_code')} />
                {/* 发送验证码 */}
                <p className={`send-code ${count === 60 ? '' : 'gra-btn'}`} onClick={count === 60 ? () => {
                    sendCodeService()
                } : () => { }}>
                    {count === 60 ? t('public.send_code') : `${count}s`}
                </p>
            </div>
            <div className="form-item">
                {/* 交易密码 */}
                <p>{t('public.trade_pass')}</p>
                <input type="password" value={inpMsg.tradePass} onChange={(e) => {
                    setInpMsg({
                        ...inpMsg,
                        tradePass: e.target.value
                    })
                }} placeholder={t('public.enter_new_pass')} />
            </div>
            <div className="form-item">
                {/* 确认密码 */}
                <p>{t('public.turn_pass')}</p>
                <input type="password" value={inpMsg.turnPass} onChange={(e) => {
                    setInpMsg({
                        ...inpMsg,
                        turnPass: e.target.value
                    })
                }} placeholder={t('public.type_turn')} />
            </div>
            <Button color='primary' block onClick={() => {
                submitSetTradePass()
            }}>
                {/* 确认 */}
                {t('public.confirm')}
            </Button>
        </div>
    )
};

export default SetLock;