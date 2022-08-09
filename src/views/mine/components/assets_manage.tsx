import { ReactElement, ReactNode } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

interface Manage {
    title: string,
    icon: string,
    url: string,
}


const MineAssetsManage = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const ManageList: Array<Manage> = [
        {
            //资产流水
            title: t('public.bill_list'),
            icon: require('../../../assets/images/order_icon.png'),
            url: '/assets-bill'
        },
        {
            //我的资产
            title: t('public.assets'),
            icon: require('../../../assets/images/assets_icon.png'),
            url: '/mine-assets'
        },
        {
            //资金密码
            title: t('public.assets_pass'),
            icon: require('../../../assets/images/assets_lock.png'),
            url: '/assets-lock'
        },
    ]
    const history = useHistory();
    return (
        <div className="mine-assets-manage">
            <p className="manage-title">
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