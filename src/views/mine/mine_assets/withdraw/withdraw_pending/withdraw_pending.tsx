import { CheckCircleFill } from "antd-mobile-icons";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from '../../../../../components/inner_nav/nav'
import './index.scss';
import { WithdrawCoinMsg } from '../../../../../utils/types';
import { Button, Steps } from 'antd-mobile';
import { useHistory } from 'react-router-dom'
const { Step } = Steps;

interface Props extends WithdrawCoinMsg {
    location: any,
};

const WithDrawPending = (props: Props): ReactElement<ReactNode> => {
    const history = useHistory();
    const [coinMsg, setCoinMsg] = useState<Props>()
    useEffect(() => {
        if (!props.location.search) {
            history.push('/withdraw');
            return
        }
        setCoinMsg(JSON.parse(decodeURI(props.location.search.slice(1))))
    }, [])
    return (
        <div className="with-draw-pending">
            <InnerNav leftArrow title="提币详情" />
            <div className="pending-con">
                <CheckCircleFill fontSize={32} color="#3070ff" />
                <p className="ini-title">提币申请已发起</p>
                <p className="ini-amount">{coinMsg?.num}&nbsp;{coinMsg?.coin}</p>
                <div className="pending-step">
                    <Steps direction='vertical' current={1}>
                        <Step
                            title='提币申请已发起'
                            description='完成时间：2020-12-01 12:30'
                        />
                        <Step
                            title='平台审核中'
                        />
                        <Step
                            title='提币完成'
                        />
                    </Steps>
                </div>
                <div className="address-msg">
                    <div className="msg-public">
                        <p>提币地址</p>
                        <p>{coinMsg?.address}</p>
                    </div>
                    <div className="msg-public">
                        <p>手续费</p>
                        <p>{coinMsg?.fee} {coinMsg?.coin}</p>
                    </div>
                </div>
            </div>
            <p className="okey-detail">
                <Button color="primary" onClick={() => { history.push('/mine-assets') }}>好的</Button>
                <Button color="default" onClick={() => { history.push('/assets-bill') }}>查看资金流水</Button>
            </p>
        </div>
    )
};

export default WithDrawPending;