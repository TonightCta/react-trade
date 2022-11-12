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
            setAccount({})
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
    };
    const LAND : string | undefined = process.env.REACT_APP_LAND;
    return (
        <div className={`mine-nav ${LAND == '1' && 'mine-nav-th' || LAND == '3' && 'mine-nav-new' || LAND == '4' && 'mine-nav-asx' || ''}`}>
            <div className="nav-msg">
                <p>
                    {/* 我的 */}
                    {t('public.mine')}
                </p>
                {/* <span>
                    <SetOutline fontSize={24} color="#333" onClick={() => {
                        history.push('/setting')
                    }} />
                </span> */}
                {/* <div className="down-box">
                    <p className="iconfont icon-xiazai-2"></p>
                    <p>Download</p>
                </div> */}
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
                            {(account.email || account.phone) ? `${account.email ? `${account.email.substring(0, 7)}...` : account.phone}` : t('public.click_login')}
                        </p>
                        <p>
                            {/* 欢迎来到80年代 */}
                            {
                                t('public.welcome',{value:LAND == '3' && 'YD' || LAND == '4' && 'ASX' || 'BIBI'})
                            }
                        </p>
                    </div>
                </div>
                <div className="account-right" onClick={() => {
                    (account?.security?.kyc === 0 || account?.security?.kyc === 3) && history.push('/auth-card')
                }}>
                    <img src={require(`../../../assets/images/card_icon${process.env.REACT_APP_LAND == '1' ? '_th' : ''}.png`)} alt="" />
                    <p>
                        {account?.security?.kyc === 0 && t('public.un_auth') || account?.security?.kyc === 1 && t('public.had_auth') || account?.security?.kyc === 2 && t('public.auth_processing') || account?.security?.kyc === 3 && t('public.reject')}
                    </p>
                    <img src={require(`../../../assets/images/right_dou${process.env.REACT_APP_LAND == '1' ? '_th' : ''}.png`)} alt="" />
                </div>
            </div>
            {
                store.getState().downApp !== 3 && LAND != '4' && <div className="download-box" onClick={() => {
                    history.push('/download')
                }}>
                    <p>
                        {/* 下载BIBI App，交易更便捷 */}
                        {t('public.download_remark')}
                    </p>
                    <p>
                        {/* 立即下载 */}
                        {t('public.download')}
                    </p>
                </div>
            }
        </div>
    )
};

export default MineNav;