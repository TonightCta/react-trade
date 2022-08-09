import { SetOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";


const MineNav = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
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
            <div className="account-box" onClick={() => {
                history.push('/login')
            }}>
                <p>
                    {/* 欢迎来到80年代 */}
                    {
                        t('public.welcome')
                    }
                </p>
                <p>
                    {/* 点击登录 */}
                    {t('public.click_login')}
                </p>
            </div>
        </div>
    )
};

export default MineNav;