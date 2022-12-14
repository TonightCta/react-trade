import { ReactElement, ReactNode } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import store from "../../../store";

export interface Manage {
    title: string,
    icon: string,
    url: string,
}


const MineAssetsManage = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const LAND : string | undefined = process.env.REACT_APP_LAND;
    const ManageList: Array<Manage> = [
        {
            //资产流水
            title: t('public.bill_list'),
            icon: require(`../../../assets/images/order_icon${LAND == '1' && '_th' || LAND == '3' && '_new' || LAND == '4' && '_asx' || ''}.png`),
            url: '/assets-bill'
        },
        {
            //我的资产
            title: t('public.assets'),
            icon: require(`../../../assets/images/assets_icon${LAND == '1' && '_th' || LAND == '3' && '_new' || LAND == '4' && '_asx' || ''}.png`),
            url: '/mine-assets'
        },
        // {
        //     //资金密码
        //     title: t('public.assets_pass'),
        //     icon: require('../../../assets/images/assets_lock.png'),
        //     url: '/assets-lock'
        // },
        {
            //当前委托
            title: t('public.now_mission'),
            icon: require(`../../../assets/images/cur_icon${LAND == '1' && '_th' || LAND == '3' && '_new' || LAND == '4' && '_asx' || ''}.png`),
            url: '/trade-order?type=1'
        },
        {
            //历史委托
            title: t('public.before_mission'),
            icon: require(`../../../assets/images/his_icon${LAND == '1' && '_th' || LAND == '3' && '_new' || LAND == '4' && '_asx' || ''}.png`),
            url: '/trade-order?type=2'
        },
    ]
    const history = useHistory();
    return (
        <div className={`mine-assets-manage ${LAND == '1' && 'mine-assets-manage-th' || LAND == '3' && 'mine-assets-manage-new' || LAND == '4' && 'mine-assets-manage-asx' || ''} ${store.getState().downApp === 3 ? 't-100' : ''}`}>
            <p className="manage-title">
                <img src={require('../../../assets/images/home_new/title_before.png')} alt="" />
                {/* 资产管理 */}
                {t('public.assets_manage')}
            </p>
            <ul className="with-three">
                {
                    ManageList.map((el: Manage, index: number): ReactElement => {
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

export default withRouter(MineAssetsManage);