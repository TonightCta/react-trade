import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import DrawBtn from "../withdraw/components/draw_btn";
import { Button, Modal, PickerView, Popup, Toast, } from "antd-mobile";
import './index.scss'
import { useTranslation } from 'react-i18next'
import { UserAssetsApi, WithdrawNetApi } from '../../../../request/api';
import store from "../../../../store";
import { useHistory } from "react-router-dom";
import { CloseOutline } from "antd-mobile-icons";


interface Trade {
    amount: number | string,
    bank_num: number | string,
}

interface Bank {
    name: string,
    channel_id_parent: number,
    channel_list: any[],
    rate: number,
    rate_num: number
}

interface Deposit {
    channel_id_parent: number,
    channel_id: number,
    address: string,
    bank_name: string,
    card_name: string,
    amount: number | string,
    fee: number,

}

const testAmount: number[] = [100, 500, 1000, 5000, 10000, 50000]
const columns: string[] = [];

const WithdrawIndex = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    //法币支持渠道
    const [coinNet, setCoinNet] = useState<Bank[]>([]);
    //默认选择渠道
    const [currentNet, setCurrentNet] = useState<string>('');
    //USDT余额
    const [currentBalance, setCurrentBalance] = useState<number>(store.getState().currentBalance);
    //选择银行
    const [selectBank, setSelectBank] = useState<boolean>(false);
    //提现信息
    const [despositMsg, setDespositMsg] = useState<Deposit>({
        channel_id: 0,//渠道父ID
        channel_id_parent: 0,//渠道银行ID
        address: '',//银行卡卡号
        bank_name: '',//银行卡名称
        card_name: '',//持卡人姓名
        amount: '',//提现金额
        fee: 0,//手续费
    })
    const setCoinNetService = async () => {
        const result = await WithdrawNetApi();
        console.log(result);
        const { data } = result;
        const bank: Bank[] = [];
        data.list.forEach((item: { rate: number, type: string; title: string, channel_list: { bank_code: string, id: number }[]; id: number }) => {
            if (item.type === 'OnLine') {
                bank.push({
                    name: item.title,
                    channel_id_parent: item.id,
                    channel_list: item.channel_list,
                    rate: item.rate,
                    rate_num: data.rate
                });
                setCurrentNet(item.channel_list[0].bank_code);
                item.channel_list.forEach(e => {
                    columns.push(e.bank_code)
                })
                setDespositMsg({
                    ...despositMsg,
                    channel_id_parent: item.id,
                    channel_id: item.channel_list[0].id,
                })
            };
        });
        setCoinNet(bank);
    };
    useEffect(() => {
        coinNet.length > 0 && coinNet[0].channel_list.forEach(item => {
            if (currentNet === item.bank_code) {
                setDespositMsg({
                    ...despositMsg,
                    channel_id: item.id
                })
            }
        })
    }, [currentNet]);
    useEffect(() => {

        setDespositMsg({
            ...despositMsg,
            fee: Number(despositMsg.amount) * coinNet[0]?.rate_num * (coinNet[0]?.rate / 100),
        });
        if (despositMsg.amount > currentBalance) {
            Toast.show(t('message.last_balance'));
            setDespositMsg({
                ...despositMsg,
                amount: currentBalance,
            })
        };
        // last_balance
    }, [despositMsg.amount])
    //是否设置交易密码
    const [isPayPass, setIsPayPass] = useState<boolean>(false);
    // const getBalance = useCallback(async (_val: string) => {
    //     const result = await UserAssetsApi();
    //     for (let i in result.data) {
    //         if (result.data[i].coin === _val) {
    //             setCurrentBalance(result.data[i].available)
    //         }
    //     }
    // }, []);
    const storeChange = () => {
        store.subscribe(() => {
            /* @ts-ignore */
            if (store.getState().account.security.pay_password == 0) {
                setIsPayPass(true);
            }
        })
    }
    useEffect(() => {
        setCoinNetService()
        storeChange();
        return () => {
            storeChange();
        }
    }, []);
    return (
        <div className="withdraw-fiat">
            <InnerNav leftArrow title={t('public.withdraw')} />
            <div className="draw-msg">
                {/* 选择币种 */}
                <div className="msg-option">
                    <p className="option-lable">
                        {/* 币种 */}
                        {t('public.coin')}
                    </p>
                    <input type="text" disabled value="USDT" onChange={() => { }} />
                </div>
                {/* 提现渠道 */}
                <div className="msg-option">
                    <p className="option-lable un-lable-margin">
                        {/* 可用渠道 */}
                        {t('public.use_bank')}
                    </p>
                    <ul className="net-list">
                        {
                            coinNet?.map((el: any, index: number): ReactElement => {
                                return (
                                    // className={`${currentNet === el ? 'active-network' : ''}`}
                                    <li key={index} className={`active-network`}>
                                        {el.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* 银行选择 */}
                <div className="msg-option" onClick={() => { setSelectBank(true) }}>
                    <p className="option-lable">
                        Select bank
                    </p>
                    <input type="text" value={despositMsg.bank_name} onChange={() => { }} disabled placeholder="Select a bank" />
                </div>
                {/* 持卡人姓名 */}
                <div className="msg-option">
                    <p className="option-lable">
                        Cardholder name
                    </p>
                    <input type="text" placeholder="Enter the cardholder name" value={despositMsg.card_name} onChange={(e) => {
                        setDespositMsg({
                            ...despositMsg,
                            card_name: e.target.value
                        })
                    }} />
                </div>
                {/* 银行卡号 */}
                <div className="msg-option">
                    <p className="option-lable">
                        {t('public.bank_num')}
                    </p>
                    <input type="number" placeholder={t('public.enter_bank_num')} value={despositMsg.address} onChange={(e) => {
                        setDespositMsg({
                            ...despositMsg,
                            address: e.target.value
                        })
                    }} />
                    {/* <span className="oper-icon"><img src={require('../../../../assets/images/book_icon.png')} /></span> */}
                </div>
                {/* 提现数量 */}
                <div className="msg-option">
                    <p className="option-lable">
                        {/* 提现数量 */}
                        {t('public.withdraw_num')}
                    </p>
                    <input type="number" placeholder={t('public.min_50')} value={despositMsg.amount} onChange={(e) => {
                        setDespositMsg({
                            ...despositMsg,
                            amount: e.target.value
                        })
                    }} />
                    <p className="inp-remark">
                        <span>USDT</span>
                        <span></span>
                        <span className="click-span" onClick={() => {
                            setDespositMsg({
                                ...despositMsg,
                                amount: currentBalance
                            })
                        }}>
                            {/* 全部 */}
                            {t('public.all')}
                        </span>
                    </p>
                    <p className="option-remark">
                        <span>{t('public.use_balance')}:{currentBalance.toFixed(4)}&nbsp;USDT</span>
                        <span>{t('public.fee')}:{despositMsg.fee.toFixed(4)}&nbsp;{process.env.REACT_APP_COIN}</span>
                    </p>
                </div>
                {/* 快捷选项 */}
                <div className="oper-amount">
                    <ul>
                        {
                            testAmount.map((el: number): ReactElement => {
                                return (
                                    <li key={el} className={`${despositMsg.amount === el ? 'active-amount' : ''}`} onClick={() => {
                                        setDespositMsg({
                                            ...despositMsg,
                                            amount: el
                                        })
                                    }}>{el}</li>
                                )
                            })
                        }
                        <li></li>
                    </ul>
                </div>
            </div>
            {/* 提币按钮 */}
            <DrawBtn type={1} fiat_rate={coinNet[0]?.rate_num} fee={despositMsg.fee} channel_id={despositMsg.channel_id} channel_id_parent={despositMsg.channel_id_parent} card_name={despositMsg.card_name} bank_name={despositMsg.bank_name} address={despositMsg.address} coin={process.env.REACT_APP_COIN} num={despositMsg.amount} />
            {/* 是否设置了交易密码 */}
            <Modal visible={isPayPass} title={t('public.hint')} content={<div className="un-bind-pay">
                <p>
                    {/* 此功能需要设置交易密码才能继续使用，是否立即前往? */}
                    {t('message.need_trade_pass')}
                </p>
                <p>
                    <Button color="default" onClick={() => {
                        history.goBack()
                    }}>
                        {/* 取消 */}
                        {t('public.cancel')}
                    </Button>
                    <Button color="primary" onClick={() => {
                        history.push('/assets-lock')
                    }}>
                        {/* 确认  */}
                        {t('public.confirm')}
                    </Button>
                </p>
            </div>}></Modal>
            {/* 选择银行 */}
            <Popup visible={selectBank} onMaskClick={() => { setSelectBank(false) }}>
                <div className="select-bank-popup">
                    <div className="bank-popup-title">
                        <CloseOutline onClick={() => { setSelectBank(false) }} />
                    </div>
                    <PickerView columns={[columns]} defaultValue={[currentNet]} onChange={(e) => {
                        setCurrentNet(String(e[0]));
                        setDespositMsg({
                            ...despositMsg,
                            bank_name: String(e[0])
                        })
                    }}></PickerView>
                    <p onClick={() => { setSelectBank(false) }}>
                        <Button color="primary" block>{t('public.confirm')}</Button>
                    </p>
                </div>
            </Popup>
        </div>
    )
};

export default WithdrawIndex;