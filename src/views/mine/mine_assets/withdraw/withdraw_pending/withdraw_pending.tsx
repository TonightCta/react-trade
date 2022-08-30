import { CheckCircleFill } from "antd-mobile-icons";
import { ReactElement, ReactNode, useState } from "react";
import InnerNav from '../../../../../components/inner_nav/nav'
import './index.scss';
import { WithdrawCoinMsg } from '../../../../../utils/types';
import { Button, Steps } from 'antd-mobile';
import { useHistory } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import store from "../../../../../store";
const { Step } = Steps;

interface Props extends WithdrawCoinMsg {
    location?: any,
};

const WithDrawPending = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    const [coinMsg, setCoinMsg] = useState<Props>(store.getState().withDrawMsg);
    return (
        <div className="with-draw-pending">
            <InnerNav leftArrow title={t('public.withdraw_detail')} />
            <div className="pending-con">
                <CheckCircleFill fontSize={32} color="#3070ff" />
                <p className="ini-title">
                    {/* 提币申请已发起 */}
                    {t('public.withdraw_pending')}
                </p>
                <p className="ini-amount">{coinMsg?.num}&nbsp;{coinMsg?.coin}</p>
                <div className="pending-step">
                    <Steps direction='vertical' current={1}>
                        <Step
                            title={t('public.withdraw_pending')}
                            description={`${t('public.over_date')}:2020-12-01 12:30`}
                        />
                        <Step
                            title={t('public.audit')}
                        />
                        <Step
                            title={t('public.withdraw_done')}
                        />
                    </Steps>
                </div>
                <div className="address-msg">
                    <div className="msg-public">
                        <p>
                            {/* 提币地址 */}
                            {t('public.withdraw_address')}
                        </p>
                        <p>{coinMsg?.address}</p>
                    </div>
                    <div className="msg-public">
                        <p>
                            {/* 手续费 */}
                            {t('public.fee')}
                        </p>
                        <p>{coinMsg.fee} {coinMsg?.coin}</p>
                    </div>
                </div>
            </div>
            <p className="okey-detail">
                <Button color="primary" onClick={() => { history.push('/mine-assets') }}>
                    {/* 好的 */}
                    {t('public.ok')}
                </Button>
                <Button color="default" onClick={() => { history.push('/assets-bill') }}>
                    {/* 查看资金流水 */}
                    {t('public.view_bill')}
                </Button>
            </p>
        </div>
    )
};

export default WithDrawPending;