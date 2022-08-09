import { ReactElement, ReactNode } from "react";
import { Button, Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResetPass = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    return (
        <div className="set-lock">
            <div className="form-item">
                <p>
                    {/* 原登录密码 */}
                    {t('public.before_pass')}
                </p>
                <input type="text" placeholder={t('public.enter_before')} />
            </div>
            <div className="form-item">
                <p>
                    {/* 新密码 */}
                    {t('public.new_pass')}
                </p>
                <input type="text" placeholder={t('public.enter_new_pass')} />
            </div>
            <div className="form-item">
                <p>
                    {/* 确认密码 */}
                    {t('public.turn_pass')}
                </p>
                <input type="text" placeholder={t('public.type_turn')} />
            </div>
            <Button color='primary' block onClick={() => {
                Toast.show(t('public.edit_success'));
                history.goBack()
            }}>{t('public.confirm')}</Button>
        </div>
    )
};

export default ResetPass;