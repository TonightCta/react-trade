import { CheckCircleFill } from "antd-mobile-icons";
import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../../../components/inner_nav/nav'
import './index.scss';
import { WithdrawCoinMsg } from '../../../../../utils/types';

interface Props extends WithdrawCoinMsg{};

const WithDrawPending = (props:Props): ReactElement<ReactNode> => {
    useEffect(() => {
        console.log(props)
    },[])
    return (
        <div className="with-draw-pending">
            <InnerNav leftArrow title="提币详情" />
            <div className="pending-con">
                <CheckCircleFill />
                <p>提币申请已发起</p>
                <p>{props.num}{props.coin}</p>
            </div>
        </div>
    )
};

export default WithDrawPending;