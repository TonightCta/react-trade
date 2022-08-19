import { ReactElement, ReactNode, useState } from "react";
import { Button, Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ResetPassApi } from '../../../../request/api';

interface Inp {
    oldPass: string,
    password: string,
    turnPass: string,
}

const ResetPass = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    const [inpMsg, setInpMsg] = useState<Inp>({
        oldPass: '',
        password: '',
        turnPass: ''
    });
    const submitResetPass = async () => {
        if (!inpMsg.oldPass) {
            //请输入原密码
            Toast.show(t('message.type_old_pass'));
            return
        }
        if (!inpMsg.password) {
            //请输入新密码
            Toast.show(t('public.enter_new_pass'));
            return
        }
        if (inpMsg.password.length < 8) {
            //登录密码最少8位
            Toast.show(t('public.last_8'));
            return
        }
        if (!inpMsg.turnPass) {
            //请再次输入新密码
            Toast.show(t('public.type_turn'));
            return
        }
        if (inpMsg.turnPass !== inpMsg.password) {
            //两次密码不一致
            Toast.show(t('message.pass_faild'));
            return
        };
        const params = {
            password_old: inpMsg.oldPass,
            password: inpMsg.password,
            password_confirmation: inpMsg.turnPass
        };
        const result = await ResetPassApi(params);
        const { code } = result;
        if (code !== 200) {
            Toast.show(result.message);
            return;
        };
        //修改成功，请重新登录
        Toast.show(t('message.re_login'));
        history.push('/login')
    }
    return (
        <div className="set-lock">
            <div className="form-item">
                <p>
                    {/* 原登录密码 */}
                    {t('public.before_pass')}
                </p>
                <input type="password" value={inpMsg.oldPass} onChange={(e) => {
                    setInpMsg({
                        ...inpMsg,
                        oldPass: e.target.value
                    })
                }} placeholder={t('public.enter_before')} />
            </div>
            <div className="form-item">
                <p>
                    {/* 新密码 */}
                    {t('public.new_pass')}
                </p>
                <input type="password" value={inpMsg.password} onChange={(e) => {
                    setInpMsg({
                        ...inpMsg,
                        password: e.target.value
                    })
                }} placeholder={t('public.enter_new_pass')} />
            </div>
            <div className="form-item">
                <p>
                    {/* 确认密码 */}
                    {t('public.turn_pass')}
                </p>
                <input type="password" value={inpMsg.turnPass} onChange={(e) => {
                    setInpMsg({
                        ...inpMsg,
                        turnPass: e.target.value
                    })
                }} placeholder={t('public.type_turn')} />
            </div>
            <Button color='primary' block onClick={() => {
                submitResetPass()
            }}>{t('public.confirm')}</Button>
        </div>
    )
};

export default ResetPass;