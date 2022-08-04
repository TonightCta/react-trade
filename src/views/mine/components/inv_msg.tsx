import { LinkOutline, UnorderedListOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode } from "react";

interface Manage {
    title: string,
    icon: string,
}
const ManageList: Array<Manage> = [
    {
        title: '一级好友',
        icon: require('../../../assets/images/test.png'),
    },
    {
        title: '二级好友',
        icon: require('../../../assets/images/test.png'),
    },
    {
        title: '三级好友',
        icon: require('../../../assets/images/test.png'),
    },
    {
        title: '邀请总数',
        icon: require('../../../assets/images/test.png'),
    },
]

const MineInvMsg = (): ReactElement<ReactNode> => {
    return (
        <div className="mine-assets-manage mine-inv">
            <div className="title-msg">
                <p className="manage-title">我的邀请</p>
                <div className="title-more-oper">
                    <p>
                        <span>详细信息</span><UnorderedListOutline fontSize={12} color="#3370ff"/>
                    </p>
                    <p>
                        <span>邀请链接</span><LinkOutline fontSize={12} color="#3370ff"/>
                    </p>
                </div>
            </div>
            <ul>
                {
                    ManageList.map((el: Manage, index: number): ReactElement => {
                        return (
                            <li>
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