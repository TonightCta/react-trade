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
                <span>
                    <SetOutline fontSize={24} color="#333" onClick={() => {
                        history.push('/setting')
                    }} />
                </span>
            </div>
            <div className="account-box">
                <div className="account-left">
                    <div className="avatar-box">
                        <img src={require('../../../assets/images/a.png')} alt="" />
                    </div>
                    <div className="account-msg">
                        <p>
                            {/* 点击登录 */}
                            {account.email ? account.email : t('public.click_login')}
                        </p>
                        <p>
                            {/* 欢迎来到80年代 */}
                            {
                                t('public.welcome')
                            }
                        </p>
                    </div>
                </div>
                <div className="account-right" onClick={() => {
                    account?.security?.kyc === 0 && history.push('/auth-card')
                }}>
                    <img src={require('../../../assets/images/card_icon.png')} alt="" />
                    <p>
                        {account?.security?.kyc === 0 && t('public.un_auth') || account?.security?.kyc === 1 && t('public.had_auth') || account?.security?.kyc === 2 && t('public.auth_processing')}
                    </p>
                    <img src={require('../../../assets/images/right_dou.png')} alt="" />
                </div>
            </div>
        </div>
    )
};

export default MineNav;