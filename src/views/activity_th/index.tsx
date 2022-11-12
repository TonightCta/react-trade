
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './index.scss'
import InnerNav from '../../components/inner_nav/nav'
import { useHistory } from 'react-router-dom';
import { Dialog } from 'antd-mobile';
import store from '../../store';
import { QueryInviteApi } from '../../request/api'



interface Reward {
    checkout: boolean,
    reward: string,
    progress: string,
    reward_type: string
}


const ActivityTH = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    //展开更多
    const [more, setMore] = useState<number>(0);
    //奖励领取
    const [visible, setVisible] = useState<boolean>(false);
    //邀请进度
    const [count, setCount] = useState<number>(0);
    //活动开始时间
    const [start, setStart] = useState<string>('');
    // 说明标题
    const RemarkTitle = (props: { title: string, mb: number }): ReactElement => {
        return (
            <div className='remark-title' style={{ marginBottom: `${props.mb}px` }}>
                <img src={require('../../assets/images/activity/title_before.png')} alt="" />
                <p>{props.title}</p>
                <img src={require('../../assets/images/activity/title_before.png')} alt="" />
            </div>
        )
    };
    //奖励列表
    const [rewardList, setRewardList] = useState<Reward[]>([]);
    //是否有奖励
    const [receive, setReceive] = useState<boolean>(false);
    //显示奖励
    const [reward, setReward] = useState<Reward>({
        checkout: false,
        reward: '',
        progress: '',
        reward_type: ''
    });
    const rules: string[] = [
        t('activity.rule_1'),
        t('activity.rule_2'),
        t('activity.rule_3'),
        t('activity.rule_4'),
        t('activity.rule_5'),
    ];
    const teams: string[] = [
        t('activity.team_1'),
        t('activity.team_2'),
        t('activity.team_3'),
    ]

    //设备型号
    const [mobileType, setMobileType] = useState<string>('');
    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
            setMobileType('IOS')
        }
        if (userAgent.includes('Android')) {
            setMobileType('Android')
        }
    }, [])
    const inviteProgressService = async () => {
        const result = await QueryInviteApi({});
        const { data } = result;
        const dt: Date = new Date(data.startTime);
        const m: string[] = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec");
        const d: string[] = new Array("st", "nd", "rd", "th");
        const mn: number = dt.getMonth();
        const dn: number = dt.getDate();
        const hour: number = dt.getHours();
        const min: number | string = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
        var dns;
        if (((dn % 10) < 1) || ((dn % 10) > 3)) {
            dns = d[3];
        }
        else {
            dns = d[(dn % 10) - 1];
            if ((dn == 11) || (dn == 12)) {
                dns = d[3];
            }
        };
        const usDate = hour + ':' + min + ' on ' + m[mn] + " " + dn + dns
        setStart(usDate);
        setRewardList(data.tasks);
        //奖励节点
        const pointList: number[] = [];
        const arr: Reward[] = [...data.tasks];
        arr.forEach((item: Reward, index: number) => {
            if (!item.checkout) {
                pointList.push(Number(item.progress))
            }
            if (item.checkout) {
                arr.splice(index, 1);
            }
        });
        for (let i in pointList) {
            if (Number(data.progress) >= pointList[i]) {
                setReceive(true);
                break
            } else {
                setReceive(false);
            }
        };
        setCount(Number(data.progress))
        setReward(arr[0]);
    };
    useEffect(() => {
        inviteProgressService();
        return () => {
            setStart('');
        }
    }, []);
    const { account }: any = store.getState();
    const [CSModal, setCSModal] = useState<boolean>(false);
    //联系客服
    const CSContent = (): ReactElement => {
        return (
            <div className="cs-content">
                <p className="cs-title">
                    {t('public.select_cs')}
                </p>
                <ul>
                    <li onClick={() => {
                        window.open(account.officeUrl['LINE'])
                    }}>
                        <img src={require('../../assets/images/line_icon.png')} alt="" />
                        LINE
                    </li>
                    <li onClick={() => {
                        window.open(account.officeUrl['TG'])
                    }}>
                        <img src={require('../../assets/images/tg_icon.png')} alt="" />
                        Telegram
                    </li>
                </ul>
                <p className="cancel-cs" onClick={() => { setCSModal(false) }}>
                    {t('public.cancel')}
                </p>
            </div>
        )
    }
    return (
        <div className={`activity-th ${mobileType === 'IOS' ? 'need-bottom' : ''}`}>
            <InnerNav leftArrow title={t('public.inv_title')} />
            <div className={`top-oper-area ${store.getState().language === 'th' ? 'top-oper-area-th' : ''}`}>
                <div className='inner-oper'>
                    <div className='progress-box'>
                        {/* 奖励名称 */}
                        <div className='reward-name'>
                            <ul>
                                {rewardList.map((item: Reward, index: number): ReactElement => {
                                    return (
                                        <li key={index} style={{ left: `${Number(item.progress) >= 50 ? Number(item.progress) - 2 : item.progress}%` }}>
                                            {item.progress == '100' ? <p>{item.reward}</p> : <p>{item.progress}%</p>}
                                            {item.progress == '100' && <img src={require('../../assets/images/activity/end_reward.png')} alt="" />}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        {/* 进度条 */}
                        <div className='progress-inner'>
                            <div className='inner-w' style={{ width: `${count}%` }}></div>
                        </div>
                        {/* 奖励节点 */}
                        {<div className='progress-point-show'>
                            <ul>
                                {
                                    rewardList.map((item: Reward, index: number): ReactElement => {
                                        return (
                                            <li key={index} style={{ left: `${item.progress}%` }}>
                                                <p></p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>}
                        {/* 奖励节点 */}
                        {count > 0 && <div className='progress-point'>
                            <ul style={{ width: `${count}%` }}>
                                <li>
                                    <p></p>
                                    {receive && <img onClick={() => {
                                        setVisible(true)
                                    }} src={require(`../../assets/images/activity/reward_icon${store.getState().language === 'th' ? '_th' : ''}.png`)} alt="" />}
                                </li>
                            </ul>
                        </div>}
                        {/* 进度百分比 */}
                        <div className={`progress-rate ${count === 0 ? 'rate-zero' : ''}`}>
                            <ul style={{ width: `${count}%` }}>
                                <li>{count}%</li>
                            </ul>
                        </div>
                    </div>
                    <p className='start-date'>{t('activity.start')} {start}</p>
                    <button onClick={() => {
                        history.push('/invite-th')
                    }}></button>
                </div>
            </div>
            <div className={`bottom-remark-area ${more === 1 ? 'show-all' : ''}`}>
                <div className='top-icon'>
                    <p className='iconfont icon-a-bianzu5beifen2'></p>
                    <p className='iconfont icon-a-bianzu5beifen2'></p>
                </div>
                {/* About activity */}
                <RemarkTitle title={t('activity.about')} mb={10} />
                <div className='about-box'>
                    <p>
                        {/* Dear user： */}
                        {t('activity.dear')}
                    </p>
                    <p>
                        {t('activity.dear_remark')}<br />
                        {t('activity.dear_remark_2')}
                    </p>
                </div>
                {/* Rule of activity */}
                <RemarkTitle title={t('activity.rule')} mb={14} />
                <div className='rules-box'>
                    <div className='reward-list'>
                        <div className='list-title'>
                            <p>
                                {/* Completion progress */}
                                {t('activity.progress')}
                            </p>
                            <p>
                                {/* Reward */}
                                {t('activity.reward')}
                            </p>
                        </div>
                        <ul>
                            <li>
                                {
                                    rewardList.map((item: Reward, index: number): ReactElement => {
                                        return (
                                            <p key={index}>
                                                {item.progress}%
                                            </p>
                                        )
                                    })
                                }
                            </li>
                            <li>
                                {
                                    rewardList.map((item: Reward, index: number): ReactElement => {
                                        return (
                                            <p key={index}>
                                                {item.reward} {item.progress != '100' ? item.reward_type : ''}
                                            </p>
                                        )
                                    })
                                }
                            </li>
                        </ul>
                    </div>
                    <ul className='reward-remark'>
                        {
                            rules.map((item: string, index: number): ReactElement => {
                                return (
                                    <li key={index}>
                                        <p className='rank'>{index + 1}</p>
                                        <p>{item}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* Terms and Conditions */}
                <RemarkTitle title={t('activity.team')} mb={14} />
                <div className='team-remark'>
                    <ul>
                        {
                            teams.map((item: string, index: number): ReactElement => {
                                return (
                                    <li key={index}>
                                        <p>{item}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p className='end-remark'>
                        {/* BIBI exchange */}
                        {t('activity.exchange')}
                    </p>
                    <p>{start}</p>
                </div>
                {/* 展开 & 收起 */}
                {more === 0 && <div className='down-and-up' onClick={() => {
                    setMore(1)
                }}>
                    <p>
                        {/* Expand more */}
                        {t('activity.expand')}
                    </p>
                    <p>
                        <img src={require('../../assets/images/activity/bottom_arrow.png')} alt="" />
                    </p>
                </div>}
            </div>
            {/* 奖励弹窗 */}
            {visible && <div className='reward-modal'>
                <div className='modal-mask' onClick={() => {
                    setVisible(false)
                }}></div>
                <div className='modal-content'>
                    <p className='iconfont icon-closefill' onClick={() => {
                        setVisible(false)
                    }}></p>
                    <p className='reward-remark'>
                        {/* Congratulations on getting */}
                        {t('activity.get')}
                    </p>
                    <p className='rewaid-thing'>{reward.reward} {reward.progress == '100' ? '' : reward.reward_type}</p>
                    <p>
                        <button onClick={() => {
                            setVisible(false)
                            account.officeUrl ? setCSModal(true) : window.open(account.supportUrl)
                        }}>
                            {/* Receive */}
                            {t('public.recive')}
                        </button>
                    </p>
                </div>
            </div>}
            {/* 联系客服 */}
            <Dialog visible={CSModal} closeOnMaskClick header={null} content={<CSContent />} />
        </div>
    )
};

export default ActivityTH;
