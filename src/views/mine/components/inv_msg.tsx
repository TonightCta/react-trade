import { LinkOutline, UnorderedListOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode } from "react";
import store from "../../../store";
import { upInvLevel } from "../../../store/app/action_creators";
import { useHistory } from 'react-router-dom'

interface Manage {
    title: string,
    icon: string,
    level: number,
}
const ManageList: Array<Manage> = [
    {
        title: '一级好友',
        icon: require('../../../assets/images/one.png'),
        level: 1,
    },
    {
        title: '二级好友',
        icon: require('../../../assets/images/two.png'),
        level: 2,
    },
    {
        title: '三级好友',
        icon: require('../../../assets/images/three.png'),
        level: 3,
    },
    {
        title: '邀请总数',
        icon: require('../../../assets/images/all.png'),
        level: 4,
    },
]

const MineInvMsg = (): ReactElement<ReactNode> => {
    const history = useHistory();
    return (
        <div className="mine-assets-manage mine-inv">
            <div className="title-msg">
                <p className="manage-title">我的邀请</p>
                <div className="title-more-oper">
                    <p>
                        <span>详细信息</span><UnorderedListOutline fontSize={12} color="#3370ff" />
                    </p>
                    <p>
                        <span>邀请链接</span><LinkOutline fontSize={12} color="#3370ff" />
                    </p>
                </div>
            </div>
            <ul>
                {
                    ManageList.map((el: Manage, index: number): ReactElement => {
                        return (
                            <li key={index} onClick={() => {
                                const action = upInvLevel(el.level);
                                store.dispatch(action);
                                history.push('/inv-detail')
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

export default MineInvMsg;