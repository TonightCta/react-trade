import { ReactElement, ReactNode, useState } from "react";
import { Button, Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TradePassApi } from '../../../../request/api'

interface Inp {
    loginPassword: string,
    tradePass: string,
    turnPass: string,
}

const SetLock = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    const [inpMsg, setInpMsg] = useState<Inp>({
        loginPassword: '',
        tradePass: '',
        turnPass: ''
    });
    const submitSetTradePass = async () => {
        if (!inpMsg.loginPassword) {
            Toast.show('请输入登录密码');
            return;
        }
        if (!inpMsg.tradePass) {
            Toast.show('请输入交易密码');
            return;
        }
        if (inpMsg.tradePass.length < 8) {
            Toast.show('交易密码最少8位');
            return;
        }
        if (!inpMsg.turnPass) {
            Toast.show('请再次输入交易密码');
            return;
        }
        if (inpMsg.tradePass !== inpMsg.turnPass) {
            Toast.show('两次密码不一致');
            return;
        };
        const params = {
            login_password: inpMsg.loginPassword,
            password: inpMsg.tradePass,
            password_confirmation: inpMsg.turnPass
        };
        const result = await TradePassApi(params);
        console.log(result);
        const { code } = result;
        if(code !== 200){
            Toast.show(result.message);
            return
        }
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