import { Button, List, Popup, Toast } from "antd-mobile";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from "../../../../components/inner_nav/nav";
import { useTranslation } from "react-i18next";
import { RechargeFaitListApi, RechargePayApi } from '../../../../request/api';

import './index.scss'

interface Support {
    select_list: number[],
    channel: {}[],
}

interface Fait {
    name: string,
    symbol: string,
    rate: number,
    amount: number,
    channel_id: number | string,
    channel_item_id: number | string,
    channel_list: any[],
    channel_name: string,
    loading: boolean
}


const RechargeFaitIndex = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    //输入金额
    const [amount, setAmount] = useState<number | string>('');
    //选择法币
    const [faitPopup, setFaitPopup] = useState<boolean>(false);
    //选择支付方式
    const [payMethod, setPayMethos] = useState<boolean>(false);
    //支付支持法币列表
    const [rechargeSupport, setRechargeSupport] = useState<Support>({
        select_list: [],
        channel: [],
    });
    //支付法币信息
    const [faitMsg, setFaitMsg] = useState<Fait>({
        name: '',
        symbol: '',
        rate: 0,
        amount: 0,
        channel_id: '',
        channel_item_id: '',
        channel_list: [],
        channel_name: '',
        loading: false,
    });
    const support = async (): Promise<void> => {
        const result = await RechargeFaitListApi();
        const list = result.data.channel.filter((item: { type: string; }) => {
            return item.type === 'OnLine'
        });
        setFaitMsg({
            ...faitMsg,
            name: list[0].title,
            symbol: String(process.env.REACT_APP_COIN),
            rate: list[0].ccy_rate,
            channel_id: list[0].id,
            channel_item_id: list[0].channel_list[0].id,
            channel_list: list[0].channel_list,
            channel_name: list[0].channel_list[0].bank_name
        })
        setRechargeSupport({
            select_list: result.data.select_list,
            channel: list
        })
    };
    useEffect(() => {
        setFaitMsg({
            ...faitMsg,
            amount: Number(amount) * faitMsg.rate
        })
    }, [amount,faitMsg.rate])
    useEffect(() => {
        support();
        return () => {
            setRechargeSupport({
                select_list: [],
                channel: [],
            })
        }
    }, []);
    const submitRecharge = async () => {
        if (!amount) {
            Toast.show(t('message.enter_amount'));
            return;
        };
        if (Number(amount) < 50) {
            Toast.show(t('public.limit_50'))
            return;
        }
        setFaitMsg({
            ...faitMsg,
            loading: true
        })
        const params = {
            channel_id: faitMsg.channel_id,
            channel_item_id: faitMsg.channel_item_id,
            amount: faitMsg.amount.toFixed(6),
            next_action: 'Wallet',
            next_id: 0,
            redirect_url: `${process.env.REACT_APP_SHARE}/#/assets-bill`
        };
        const result = await RechargePayApi(params);
        console.log(result);
        setFaitMsg({
            ...faitMsg,
            loading: false
        })
        const { code, data } = result;
        if (code !== 200) {
            Toast.show(result.message);
            return;
        };

        // event.preventDefault()
        window.location.href = data.pay_url;
        // const temp = window.open('_blank');
        // temp!.location = data.pay_url;
        // const a = document.createElement('a');
        // a.href = data.pay_url;
        // a.target = '_blank';
        // document.body.appendChild(a);
        // a.click();
        // a.remove();
        // return false;
    }
    return (
        <div className="recharge-fait-index">
            <InnerNav leftArrow title={t('public.recharge_fait')} />
            <div className="select-msg">
                <List>
                    <List.Item extra="USDT">
                        {t('public.coin')}
                    </List.Item>
                    <List.Item extra={faitMsg.name} onClick={() => { setFaitPopup(true) }}>
                        {/* 选择充值网络 */}
                        {
                            t('public.select_net')
                        }
                    </List.Item>
                    {faitMsg.channel_list.length > 0 && <List.Item extra={faitMsg.channel_name} onClick={() => { setPayMethos(true) }}>
                        {/* 选择充值网络 */}
                        {
                            t('public.pay_away')
                        }
                    </List.Item>}
                </List>
            </div>
            <div className="charge-msg">
                <p className="msg-title">{t('public.recharge_amount')}(USDT)</p>
                <div className="inp-amount">
                    <input type="number" value={amount} onChange={(e: any) => {
                        setAmount(e.target.value);
                    }} placeholder={t('public.type_recharge_amount')} />
                    <p>USDT</p>
                </div>
                <div className="amount-oper">
                    <ul>
                        {
                            rechargeSupport.select_list.map((el: number, index: number): ReactElement => {
                                return (
                                    <li key={index} className={`${amount == el ? 'selected-amount' : ''}`} onClick={() => {
                                        setAmount(el)
                                    }}>{el}</li>
                                )
                            })
                        }
                        <li></li>
                    </ul>
                </div>
                <p className="fait-type">
                    &asymp;{faitMsg.symbol}
                </p>
                <p className="fait-amount">
                    {faitMsg.amount.toFixed(4)}&nbsp;{faitMsg.symbol}
                </p>
                <p className="next-step">
                    <Button loading={faitMsg.loading} disabled={faitMsg.loading} color="primary" block onClick={submitRecharge}>
                        {/* 下一步 */}
                        {t('public.next')}
                    </Button>
                </p>
                <p className="fait-remark">
                    {/* 温馨提示：付款后请联系在线客服 */}
                    {t('public.recharge_fait_remark')}
                </p>
            </div>
            {/* 选择法币 */}
            <Popup visible={faitPopup} onMaskClick={() => { setFaitPopup(false) }}>
                <div className="fait-popup">
                    <ul>
                        {
                            rechargeSupport.channel.map((el: any, index: number): ReactElement => {
                                return (
                                    <li key={index} onClick={() => {
                                        setFaitMsg({
                                            ...faitMsg,
                                            name: el.title,
                                            symbol: el.ccy_no,
                                            rate: el.ccy_rate,
                                            channel_id: el.id,
                                            channel_item_id: el.channel_list[0].id,
                                            channel_list: el.channel_list,
                                            channel_name: el.channel_list[0].bank_name
                                        });
                                        setFaitPopup(false)
                                    }}>
                                        {el.title}
                                    </li>
                                )
                            })
                        }
                        <li className="cancel-popup" onClick={() => { setFaitPopup(false) }}>
                            {/* 取消 */}
                            {t('public.cancel')}
                        </li>
                    </ul>
                </div>
            </Popup>
            {/* 支付方式 */}
            <Popup visible={payMethod} onMaskClick={() => { setPayMethos(false) }}>
                <div className="fait-popup">
                    <ul>
                        {
                            faitMsg.channel_list.map((el: any, index: number): ReactElement => {
                                return (
                                    <li key={index} onClick={() => {
                                        setFaitMsg({
                                            ...faitMsg,
                                            channel_item_id: el.id,
                                            channel_name: el.bank_name
                                        });
                                        setPayMethos(false)
                                    }}>
                                        {el.bank_name}
                                    </li>
                                )
                            })
                        }
                        <li className="cancel-popup" onClick={() => { setPayMethos(false) }}>
                            {/* 取消 */}
                            {t('public.cancel')}
                        </li>
                    </ul>
                </div>
            </Popup>
        </div>
    )
};
export default RechargeFaitIndex;

