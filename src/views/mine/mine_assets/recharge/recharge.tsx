import { ReactElement, ReactNode } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import { List } from "antd-mobile";
import { useTranslation } from "react-i18next";
import './index.scss'

const RechargeIndex = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    return (
        <div className="recharge-index">
            {/* 充币 */}
            <InnerNav leftArrow title={t('public.recharge')} />
            <div className="charge-msg">
                <List>
                    <List.Item extra="USDT" onClick={() => { }}>
                        {/* 币种 */}
                        {t('public.coin')}
                    </List.Item>
                    <List.Item extra="USDT-TRC20" onClick={() => { }}>
                        {/* 选择充值网络 */}
                        {
                            t('public.select_net')
                        }
                    </List.Item>
                </List>
            </div>
            <div className="charge-qr">
                <p className="charge-title">
                    {/* 扫二维码，转入 */}
                    {t('public.qr_pay')}
                    USDT</p>
                <img src={require('../../../../assets/images/test.png')} alt="" />
                <p className="charge-address-title">
                    {/* 充值地址 */}
                    {t('public.recharge_address')}
                </p>
                <p className="charge-address">JJJHTFCDRCVGhxbhsyxgu4556cdac</p>
                <div className="copy-btn">
                    {/* 复制 */}
                    {t('public.copy')}
                </div>
            </div>
            <div className="charge-remark">
                <p className="remark-title">
                    {/* 充值说明 */}
                    {t('public.recharge_remark')}:</p>
                <p className="remark-text">1. {t('public.recharge_remark_1')}(USDT-TRC20){t('public.recharge_remark_1_1')}</p>
                <p className="remark-text">2. {t('public.recharge_remark_2')}</p>
                <p className="remark-text">3. {t('public.recharge_remark_3')}</p>
            </div>
        </div>
    )
};

export default RechargeIndex;