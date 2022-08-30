import { SetOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UpAvatarApi } from '../../../request/api'
import store from "../../../store";
import { Toast } from "antd-mobile";
import { upUserInfo } from "../../../store/app/action_fn";


const MineNav = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    const [account, setAccount] = useState<any>(store.getState().account);
    const storeChange = () => {
        store.subscribe(() => {
            setAccount(store.getState().account)
        })
    };
    useEffect(() => {
        storeChange();
        return () => {
            storeChange();
            setAccount(store.getState().account)
        }
    }, []);
    const upAvatarEv = async (_file: File) => {
        const formdata = new FormData();
        formdata.append('avatar', _file);
        const result = await UpAvatarApi(formdata);
        const { code } = result;
        if (code !== 200) {
            Toast.show(result.message);
            return;
        };
        //上传成功
        Toast.show(t('message.upload_success'));
        upUserInfo();
    }
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
                        {
                            account.avatar
                                ? <p>
                                    <img src={account.avatar} alt="" />
                                    <input type="file" accept="image/*" onChange={async (e) => {
                                        upAvatarEv(e.target.files![0])
                                    }} />
                                </p>
                                : <p>
                                    <img src={require('../../../assets/images/default_avatar.png')} alt="" />
                                    <input type="file" accept="image/*" onChange={async (e) => {
                                        upAvatarEv(e.target.files![0])
                                    }} />
                                </p>
                        }
                        <div className="edit-avatar-box">
                            <img src={require('../../../assets/images/edit_avatar.png')} className="edit-avatar" alt="" />
                        </div>

                    </div>
                    <div className="account-msg">
                        <p>
                            {/* 点击登录 */}
                            {account.email ? `${account.email.substring(0,7)}...` : t('public.click_login')}
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
                    account?.security?.kyc === 0 || account?.security?.kyc === 3 && history.push('/auth-card')
                }}>
                    <img src={require('../../../assets/images/card_icon.png')} alt="" />
                    <p>
                        {account?.security?.kyc === 0 && t('public.un_auth') || account?.security?.kyc === 1 && t('public.had_auth') || account?.security?.kyc === 2 && t('public.auth_processing') || account?.security?.kyc === 3 && t('public.reject')}
                    </p>
                    <img src={require('../../../assets/images/right_dou.png')} alt="" />
                </div>
            </div>
        </div>
    )
};

export default MineNav;