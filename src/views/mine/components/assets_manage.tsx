import { ReactElement, ReactNode } from "react";
import { withRouter,useHistory } from 'react-router-dom'

interface Manage {
    title: string,
    icon: string,
    url:string,
}
const ManageList: Array<Manage> = [
    {
        title: '资产流水',
        icon: require('../../../assets/images/order_icon.png'),
        url:'/assets-bill'
    },
    {
        title: '我的资产',
        icon: require('../../../assets/images/assets_icon.png'),
        url:'/mine-assets'
    },
    {
        title: '资金密码',
        icon: require('../../../assets/images/assets_lock.png'),
        url:'/assets-lock'
    },
]

const MineAssetsManage = (): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="mine-assets-manage">
            <p className="manage-title">资产管理</p>
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