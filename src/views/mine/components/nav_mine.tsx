import { SetOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import store from "../../../store";


const MineNav = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    const account = store.getState().account;
    return (
        <div className="mine-nav">
            <div className="nav-msg">
                <p>
                    {/* 我的 */}
                    {t('public.mine')}
                </p>
                <SetOutline fontSize={28} color="#333" onClick={() => {
                    history.push('/setting')
                }} />
            </div>
            <div className="account-box">
                <p>
                    {/* 欢迎来到80年代 */}
                    {
                        t('public.welcome')
                    }
                </p>
                <p>
                    {/* 点击登录 */}
                    {account.email ? account.email : t('public.click_login')}
                </p>
            </div>
        </div>
    )
};

export default MineNav;