import { CloseOutline, LinkOutline, UnorderedListOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useState } from "react";
import store from "../../../store";
import { upInvLevel } from "../../../store/app/action_creators";
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd-mobile';

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

const ModalContent = (props: { closeModal: () => void }): ReactElement => {
    return (
        <div className="modal-content-inv">
            <p className="close-icon" onClick={() => { props.closeModal() }}><CloseOutline /></p>
            <p className="modal-title-mine">
                xx推广计划奖励制度
            </p>
            <div className="modal-inv-reward">
                <p>一代:60%</p>
                <p>二代:30%</p>
                <p>三代:10%</p>
            </div>
            <p className="modal-title-mine">
                推广计划奖励制度详情
            </p>
            <ul>
                <li>若用戶邀請了10名-代好友，他的一代好友分別邀請了2名二代好友，他的二代好友分別邀請了5名三代好友，此用戶就擁有10名一代好友，20名二代好友，100名三代好友如果平均每人交易一-次數字貨幣的金額是1000美金，手續費是1美金，那麼此用戶佣金收入約: 10*10*60%+ 20*10*30%+100*10*10% =220美金。</li>
                <li>若用戶邀請了100名一代好友，他的一代好友分別邀請了2名二代好友，他的二代好友分別邀請了5名三代好友，此用戶就擁有100名一代好友，200名二代好友，如果平均每人交易一次數字貨幣的金額是1000美金，手續費是8美金，那麼此用戶佣金收入約: 100*10*60% +</li>
                <li>200*10* 30%+ 1000*10*10% =2200美金。</li>
                <li>若用戶邀請了1000名一代好友，他的一-代好友分別邀請了2名二代好友，他的二代好友分別邀請了5名三代好友，此用戶就擁有1000名一代好友，2000名二代好友，10000名三代好友如果平均每人交易一次數字貨幣的金額是1000美金，手續費是10美金，那麼此用戶佣金收入約1000* 10*60%+ 2000* 10* 30%+ 10000*10* 10%=22000美金</li>
            </ul>
        </div>
    )
};

const MineInvMsg = (): ReactElement<ReactNode> => {
    const [msgModal, setMsgModal] = useState<boolean>(false);
    const history = useHistory();
    return (
        <div className="mine-assets-manage mine-inv">
            <div className="title-msg">
                <p className="manage-title">我的邀请</p>
                <div className="title-more-oper">
                    <p onClick={() => {
                        setMsgModal(true)
                    }}>
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
            <Modal
                visible={msgModal}
                content={<ModalContent closeModal={() => { setMsgModal(false) }} />}
                closeOnMaskClick
                closeOnAction
                onClose={() => {
                    setMsgModal(false)
                }}
            />
        </div>
    )
};

export default MineInvMsg;