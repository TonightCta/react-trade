import { CloseOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import store from "../../../store";
import { upInvLevel } from "../../../store/app/action_creators";
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import { InvInfoApi } from '../../../request/api'

interface Manage {
    title: string,
    icon: string,
    level: number,
    url: string,
    out: boolean,
    class?: string
}


const ModalContent = (props: { closeModal: () => void }): ReactElement => {
    const { t } = useTranslation();
    const [invInfo, setInvInfo] = useState<any>({
        article: {
            title: '',
            content: "",
        },
        levels: [
            { reward: '', deposit_reward: '' },
            { reward: '', deposit_reward: '' },
            { reward: '', deposit_reward: '' },
        ]
    });
    const getInvInfo = useCallback(async () => {
        const result = await InvInfoApi();
        setInvInfo(result.data);
    }, [])
    useEffect(() => {
        getInvInfo();
        return () => {
            setInvInfo({});
        }
    }, [])
    return (
        <div className="modal-content-inv">
            <p className="close-icon" onClick={() => { props.closeModal() }}><CloseOutline /></p>
            <p className="modal-title-mine">
                {/* 奖励规则 */}
                {t('public.reward_rule')}
            </p>
            <div className="modal-inv-reward">
                {invInfo?.openDepositReward === 1 && <div>
                    <p className="modal-title">
                        {/* 充值返佣 */}
                        {t('public.recharge_reward')}
                    </p>
                    <p>
                        {/* 一代:60% */}
                        Level 1 :
                        {
                            invInfo?.levels[0].deposit_reward
                        }
                        U
                    </p>
                    <p>
                        {/* 二代:30% */}
                        Level 2 :
                        {
                            invInfo?.levels[1].deposit_reward
                        }
                        U
                    </p>
                    <p>
                        {/* 三代:10% */}
                        Level 3 :
                        {
                            invInfo?.levels[2].deposit_reward
                        }
                        U
                    </p>
                </div>}
                <div>
                    <p className="modal-title">
                        {/* 交易返佣 */}
                        {t('public.recharge_trade')}
                    </p>
                    <p>
                        {/* 一代:60% */}
                        Level 1 :
                        {
                            invInfo?.levels[0].reward
                        }
                        %
                    </p>
                    <p>
                        {/* 二代:30% */}
                        Level 2 :
                        {
                            invInfo?.levels[1].reward
                        }
                        %
                    </p>
                    <p>
                        {/* 三代:10% */}
                        Level 3 :
                        {
                            invInfo?.levels[2].reward
                        }
                        %
                    </p>
                </div>
            </div>
            <p className="modal-title-mine">
                {/* 推广计划奖励制度详情 */}
                {
                    invInfo.article.title
                }
            </p>
            <div className="content-box" style={{ lineHeight: '22px' }} dangerouslySetInnerHTML={{ __html: invInfo.article.content }}></div>
        </div>
    )
};

const MineInvMsg = (): ReactElement<ReactNode> => {
    const [msgModal, setMsgModal] = useState<boolean>(false);
    const { t } = useTranslation();
    const LAND: string | undefined = process.env.REACT_APP_LAND;
    const LINK: string = `/invite${LAND == '1' && '-th' || LAND == '3' && '-new' || LAND == '4' && '-asx' || ''}`;
    const ManageList: Array<Manage> = [
        {
            //邀请链接
            title: t('public.inv_link'),
            icon: require(`../../../assets/images/link_icon${LAND == '1' && '_th' || LAND == '3' && '_new' || ''}.png`),
            level: 1,
            url: LINK,
            out: false,
            class: 'm-t-zero',
        },
        {
            //邀请规则
            title: t('public.detail'),
            icon: require(`../../../assets/images/rules_icon${LAND == '1' && '_th' || LAND == '3' && '_new' || ''}.png`),
            level: 1,
            url: '',
            out: true,
            class: 'm-t-zero',
        },
        {
            //一级好友
            title: t('public.level_one'),
            icon: require(`../../../assets/images/one${LAND == '1' && '_th' || LAND == '3' && '_new' || LAND == '4' && '_asx' || ''}.png`),
            level: 1,
            url: '/inv-detail',
            out: false,
            class: 'm-t-zero',
        },
        {
            //二级好友
            title: t('public.level_two'),
            icon: require(`../../../assets/images/two${LAND == '1' && '_th' || LAND == '3' && '_new' || LAND == '4' && '_asx' || ''}.png`),
            level: 2,
            url: '/inv-detail',
            out: false,
        },
        {
            //三级好友
            title: t('public.level_three'),
            icon: require(`../../../assets/images/three${LAND == '1' && '_th' || LAND == '3' && '_new' || LAND == '4' && '_asx' || ''}.png`),
            level: 3,
            url: '/inv-detail',
            out: false,
        },
        {
            //邀请总数
            title: t('public.inv_total'),
            icon: require(`../../../assets/images/all${LAND == '1' && '_th' || LAND == '3' && '_new' || LAND == '4' && '_asx' || ''}.png`),
            level: 4,
            url: '/inv-detail',
            out: false,
        },
    ]
    const history = useHistory();
    return (
        <div className={`mine-assets-manage mine-inv ${LAND == '1' && 'mine-assets-manage-th' || LAND == '3' && 'mine-assets-manage-new' || LAND == '4' && 'mine-assets-manage-asx-reset' || ''}`}>
            <div className="title-msg">
                <p className="manage-title">
                    <img src={require('../../../assets/images/home_new/title_before.png')} alt="" />
                    {/* 我的邀请 */}
                    {t('public.inv_mine')}
                </p>
                {/* <div className="title-more-oper">
                    <p onClick={() => {
                        setMsgModal(true)
                    }}>
                        <span>
                            {
                                t('public.detail')
                            }
                        </span><UnorderedListOutline fontSize={12} color="#3370ff" />
                    </p>
                    <p onClick={() => {
                        history.push('/invite')
                    }}>
                        <span>
                            {
                                t('public.inv_link')
                            }
                        </span><LinkOutline fontSize={12} color="#3370ff" />
                    </p>
                </div> */}
            </div>
            {LAND != '4' ? <ul>
                {
                    ManageList.map((el: Manage, index: number): ReactElement => {
                        return (
                            <li key={index} className={`${el.class ? el.class : ''}`} onClick={() => {
                                const routeNext = () => {
                                    const action = upInvLevel(el.level);
                                    store.dispatch(action);
                                    history.push(el.url)
                                }
                                el.out ? setMsgModal(true) : routeNext();
                            }}>
                                <img src={el.icon} alt="" />
                                <p>{el.title}</p>
                            </li>
                        )
                    })
                }
            </ul>
                : <div className="asx-invite-msg">
                    <div className="left-link">
                        <ul>
                            <li onClick={() => {
                                history.push(LINK)
                            }}>{t('public.inv_link')}</li>
                            <li onClick={() => {
                                setMsgModal(true)
                            }}>{t('public.detail')}</li>
                        </ul>
                    </div>
                    <div className="right-level">
                        <ul>
                            {
                                ManageList.splice(2, 5).map((el: Manage, index: number): ReactElement => {
                                    return (
                                        <li key={index} className={`${el.class ? el.class : ''}`} onClick={() => {
                                            const action = upInvLevel(el.level);
                                            store.dispatch(action);
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
                </div>}
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