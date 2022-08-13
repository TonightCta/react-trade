import { CloseOutline, LinkOutline, UnorderedListOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useState } from "react";
import store from "../../../store";
import { setInvBox, upInvLevel } from "../../../store/app/action_creators";
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd-mobile';
import { useTranslation } from 'react-i18next'

interface Manage {
    title: string,
    icon: string,
    level: number,
}


const ModalContent = (props: { closeModal: () => void }): ReactElement => {
    const { t } = useTranslation();
    return (
        <div className="modal-content-inv">
            <p className="close-icon" onClick={() => { props.closeModal() }}><CloseOutline /></p>
            <p className="modal-title-mine">
                xx推广计划奖励制度
            </p>
            <div className="modal-inv-reward">
                <p>
                    {/* 一代:60% */}
                    {
                        t('public.percent_one')
                    }
                </p>
                <p>
                    {/* 二代:30% */}
                    {
                        t('public.percent_two')
                    }
                </p>
                <p>
                    {/* 三代:10% */}
                    {
                        t('public.percent_three')
                    }
                </p>
            </div>
            <p className="modal-title-mine">
                {/* 推广计划奖励制度详情 */}
                {t('public.adv_title')}
            </p>
            <ul>
                <li>{t('public.adv_remarl_1')}</li>
                <li>{t('public.adv_remarl_2')}</li>
                <li>{t('public.adv_remarl_3')}</li>
                <li>{t('public.adv_remarl_4')}</li>
            </ul>
        </div>
    )
};

const MineInvMsg = (): ReactElement<ReactNode> => {
    const [msgModal, setMsgModal] = useState<boolean>(false);
    const { t } = useTranslation();
    const ManageList: Array<Manage> = [
        {
            //一级好友
            title: t('public.level_one'),
            icon: require('../../../assets/images/one.png'),
            level: 1,
        },
        {
            //二级好友
            title: t('public.level_two'),
            icon: require('../../../assets/images/two.png'),
            level: 2,
        },
        {
            //三级好友
            title: t('public.level_three'),
            icon: require('../../../assets/images/three.png'),
            level: 3,
        },
        {
            //邀请总数
            title: t('public.inv_total'),
            icon: require('../../../assets/images/all.png'),
            level: 4,
        },
    ]
    const history = useHistory();
    return (
        <div className="mine-assets-manage mine-inv">
            <div className="title-msg">
                <p className="manage-title">
                    {/* 我的邀请 */}
                    {t('public.inv_mine')}
                </p>
                <div className="title-more-oper">
                    <p onClick={() => {
                        setMsgModal(true)
                    }}>
                        <span>
                            {/* 详细信息 */}
                            {
                                t('public.detail')
                            }
                        </span><UnorderedListOutline fontSize={12} color="#3370ff" />
                    </p>
                    <p onClick={() => {
                        const action = setInvBox(1);
                        store.dispatch(action)
                    }}>
                        <span>
                            {/* 邀请链接 */}
                            {
                                t('public.inv_link')
                            }
                        </span><LinkOutline fontSize={12} color="#3370ff" />
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