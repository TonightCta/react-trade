import { ReactElement, ReactNode } from "react";
import { Button, Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SetLock = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    return (
        <div className="set-lock">
            <div className="form-item">
                {/* 登录密码 */}
                <p>{t('public.login_pass')}</p>
                <input type="text" placeholder={t('public.enter_login_pass')} />
            </div>
            <div className="form-item">
                {/* 交易密码 */}
                <p>{t('public.trade_pass')}</p>
                <input type="text" placeholder={t('public.enter_new_pass')} />
            </div>
            <div className="form-item">
                {/* 确认密码 */}
                <p>{t('public.turn_pass')}</p>
                <input type="text" placeholder={t('public.type_turn')} />
            </div>
            <Button color='primary' block onClick={() => {
                Toast.show(t('public.edit_success'));
                history.goBack()
            }}>
                {/* 确认 */}
                {t('public.confirm')}
            </Button>
        </div>
    )
};

export default SetLock;