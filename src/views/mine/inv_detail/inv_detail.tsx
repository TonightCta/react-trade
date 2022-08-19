import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import './index.scss'
import { upFooterStatus } from "../../../store/app/action_creators";
import { useTranslation } from "react-i18next";
import { DateConvert } from '../../../utils/index'
import { Tabs } from "antd-mobile";

const InvDetail = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, []);
    const [tabKey, setTabKey] = useState<number>(1);
    const level = store.getState().invLevel;
    return (
        <div className="inv-detail">
            <InnerNav leftArrow={true} title={t('public.detail')} withBorder={true} />
            <div className="white-content">
                <p className="level-title">
                    Level&nbsp;{level === 4 ? 'Total' : level}&nbsp;-&nbsp;{t('public.detail')}
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
                        <span>0</span>
                        {/* 人 */}
                        {tabKey === 1 ? t('public.people') : 'USDT'}
                    </p>
                </div>
                <p className="inv-date">
                    {/* 截止至 */}
                    {
                        t('public.end_wait')
                    }
                    &nbsp;{DateConvert(new Date().getTime())}</p>
            </div>
        </div>
    )
};

export default InvDetail;