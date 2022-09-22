import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import './index.scss'
import { useTranslation } from "react-i18next";
import { DateConvert } from '../../../utils/index'
import { Empty, Popover, Tabs } from "antd-mobile";
import { InviteNumberApi } from '../../../request/api';

const InvDetail = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [invMsg, setInvMsg] = useState<any>({});
    const [tabKey, setTabKey] = useState<number>(1);
    const inviteMsg = async () => {
        const result = await InviteNumberApi(level === 4 ? -1 : level);
        setInvMsg(result.data);
    };
    useEffect(() => {
        inviteMsg();
        return () => {
            setInvMsg({})
        }
    }, [])
    const level = store.getState().invLevel;
    return (
        <div className="inv-detail">
            <InnerNav leftArrow={true} title={t('public.detail')} withBorder={true} />
            <div className="white-content">
                <p className="level-title">
                    {t('message.level')}&nbsp;{level === 4 ? t('message.total') : level}&nbsp;-&nbsp;{t('public.detail')}
                </p>
                {level === 4 && <Tabs onChange={(e) => {
                    setTabKey(Number(e))
                }} style={{
                    '--title-font-size': '14px',
                }}>
                    <Tabs.Tab key={1} title={t('public.inv_human')}></Tabs.Tab>
                    <Tabs.Tab key={2} title={t('public.inv_amount')}></Tabs.Tab>
                </Tabs>}
                <div className="inv-msg">
                    <p>
                        {/* 受邀者总数 */}
                        {tabKey === 1 ? t('public.inv_total') : t('public.inv_amount')}
                    </p>
                    <p>
                        <span>{tabKey === 1 ? invMsg?.allInvites : invMsg?.allRewards}</span>
                        {/* 人 */}&nbsp;
                        {tabKey === 1 ? t('public.people') : 'USDT'}
                    </p>
                </div>
                <p className="inv-date">
                    {/* 截止至 */}
                    {
                        t('public.end_wait')
                    }
                    &nbsp;{DateConvert(new Date().getTime())}</p>
                {/* 邀请明细 */}
                <>
                    {
                        tabKey === 1 ?
                            <div className={`inv-list list-human ${level === 4 ? 'four-item' : ''}`}>
                                {invMsg.allInviteUsers && invMsg.allInviteUsers.length > 0 ? <ul className="data-list">
                                    <li>
                                        <p>{t('public.time')}</p>
                                        {level === 4 && <p>
                                            {/* 级别 */}
                                            {t('message.level')}
                                        </p>}
                                        <p>
                                            {/* ID */}
                                            {t('public.email')}
                                        </p>
                                        <p>
                                            {/* Amount */}
                                            {t('public.vol')}
                                        </p>
                                        <p>
                                            {t('public.vol_inv')}
                                        </p>
                                    </li>
                                    {
                                        invMsg.allInviteUsers.map((item: any, index: number): ReactElement => {
                                            return (
                                                <li key={index}>
                                                    <p><span>{item.created_at.substr(0, 10)}</span>{item.created_at.substr(11, 19)}</p>
                                                    {level === 4 && <p>{item.level}</p>}
                                                    <Popover
                                                        content={item.email}
                                                        trigger='click'
                                                        placement='top'
                                                    >
                                                        <p>{item.email.substr(0,3)}...</p>
                                                    </Popover>
                                                    <p>{item.amount}</p>
                                                    <p>{item.deposit_amount}</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul> : <Empty description={t('public.has_no_data')} />}
                            </div>
                            : <div className="inv-list list-reward">
                                {invMsg.rewardsList && invMsg.rewardsList.length > 0 ? <ul className="data-list">
                                    <li>
                                        <p>{t('public.time')}</p>
                                        <p>{t('public.type')}</p>
                                        <p>{t('public.vol')}</p>
                                    </li>
                                    {
                                        invMsg.rewardsList.map((item: any, index: number): ReactElement => {
                                            return (
                                                <li key={index} className="other-size">
                                                    <p><span>{item.created_at.substr(0, 10)}</span>{item.created_at.substr(11, 19)}</p>
                                                    <p>{item.spot?.symbol}</p>
                                                    <p>{item.true_amount}</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul> : <Empty description={t('public.has_no_data')} />}
                            </div>
                    }
                </>
            </div>
        </div>
    )
};

export default InvDetail;