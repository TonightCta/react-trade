import { ReactElement, ReactNode } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import { List } from "antd-mobile";
import './index.scss'

const RechargeIndex = (): ReactElement<ReactNode> => {
    return (
        <div className="recharge-index">
            <InnerNav leftArrow title="充币" />
            <div className="charge-msg">
                <List>
                    <List.Item extra="USDT" onClick={() => { }}>币种</List.Item>
                    <List.Item extra="USDT-TRC20" onClick={() => { }}>选择充值网络</List.Item>
                </List>
            </div>
            <div className="charge-qr">
                <p className="charge-title">扫二维码，转入USDT</p>
                <img src={require('../../../../assets/images/test.png')} alt="" />
                <p className="charge-address-title">充值地址</p>
                <p className="charge-address">JJJHTFCDRCVGhxbhsyxgu4556cdac</p>
                <div className="copy-btn">
                    复制
                </div>
            </div>
            <div className="charge-remark">
                <p className="remark-title">充值说明：</p>
                <p className="remark-text">1. 请通过客户端或在线钱包将您需要充值的相应币种(USDT-TRC20)数目发送到该地址，充入其他资产将无法找回。</p>
                <p className="remark-text">2. 发送完成后，系统会自动在此交易获得相应数量确认后将该笔虚拟币充值到您在本站的账户，相应数量的确认需要3大约0.5到1小时时间，请耐心等待。(确认数为2)</p>
                <p className="remark-text">3. 同一个地址可多次充值，不影响到账。最小充值金额0.00001。</p>
            </div>
        </div>
    )
};

export default RechargeIndex;