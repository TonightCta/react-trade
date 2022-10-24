import { ReactElement, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Manage } from "./assets_manage";

const MineOperBar = (): ReactElement<ReactNode> => {
    const history = useHistory();
    const { t } = useTranslation();
    const safeList: Manage[] = [
        {
            //资金密码
            title: t('public.assets_pass'),
            icon: require(`../../../assets/images/assets_lock${process.env.REACT_APP_AREA == '66' ? '_th' : ''}.png`),
            url: '/assets-lock'
        },
        {
            //实名认证
            title: t('public.verify_card'),
            icon: require(`../../../assets/images/auth_icon${process.env.REACT_APP_AREA == '66' ? '_th' : ''}.png`),
            url: '/auth-card'
        },
        {
            //登录密码
            title: t('public.edit_login_pass'),
            icon: require(`../../../assets/images/pass_icon${process.env.REACT_APP_AREA == '66' ? '_th' : ''}.png`),
            url: '/set-pass'
        },
        {
            //设置
            title: t('public.set_center'),
            icon: require(`../../../assets/images/set_icon${process.env.REACT_APP_AREA == '66' ? '_th' : ''}.png`),
            url: '/setting'
        },
    ]
    return (
        <div className={`mine-oper-bar mine-assets-manage ${process.env.REACT_APP_AREA == '66' ? 'mine-assets-manage-th' : ''}`}>
            {/* <List style={{ "--font-size": "15px" }}>
                <List.Item prefix={<img src={require('../../../assets/images/other_1.png')} />} onClick={() => {
                    history.push('/trade-order')
                }}>
                    {t('public.mine_en')}
                </List.Item>
                <List.Item prefix={<img src={require('../../../assets/images/other_2.png')} />} onClick={() => {
                    history.push('/safe')
                }}>
                    {
                        t('public.safe_set')
                    }
                </List.Item>
            </List> */}
            <p className="manage-title">
                {/* 安全设置 */}
                {t('public.safe_set')}
            </p>
            <ul className="with-three">
                {
                    safeList.map((el: Manage, index: number): ReactElement => {
                        return (
                            <li key={index} onClick={() => {
                                history.push(el.url)
                            }}>
                                <img src={el.icon} alt="" />
                                <p>{el.title}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

export default MineOperBar;