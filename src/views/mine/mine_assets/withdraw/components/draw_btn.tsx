import { Button, Toast } from "antd-mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactElement, ReactNode } from "react";
import { Popup } from 'antd-mobile'
import { CloseOutline } from "antd-mobile-icons";
import { useHistory } from 'react-router-dom';
import { IResponse, WithdrawCoinMsg } from '../../../../../utils/types';
import { useTranslation } from 'react-i18next';
import { SendCodeApi, WithdrawApiNew } from '../../../../../request/api'
import store from "../../../../../store";
import { UpWithdraw } from "../../../../../store/app/action_creators";

interface Props extends WithdrawCoinMsg {
    type: number,
    disable:boolean
}

interface PropsSafe extends WithdrawCoinMsg {
    closeSafeBox: () => void;
    type: number
}
interface Safe {
    password: string,
    code: string | number
}

const SafeAuth = (props: PropsSafe): ReactElement => {
    const { t } = useTranslation();
    const [count, setCount] = useState<number>(60);
    const cbSaver: any = useRef();
    const timer = useRef<NodeJS.Timer>();
    const [loading, setLoading] = useState<boolean>(false)
    cbSaver.current = () => {
        setCount(count - 1);
    };
    // useCallback可牵制countDown不创建新的函数实例，但内部调用的值是最新的
    const countDown = useCallback((): void => {
        timer.current = setInterval(() => {
            cbSaver.current();
        }, 1000);
    }, []);

    //监听count
    useEffect(() => {
        if (count < 0) {
            clearInterval(timer.current);
            setCount(60)
        };
    }, [count]);

    //页面离开时执行
    useEffect(() => {
        return () => {
            clearInterval(timer.current);
        }
    }, []);
    // 校验信息
    const [drawSafe, setDrawSafe] = useState<Safe>({
        password: '',
        code: ''
    });
    const sendCodeEv = async () => {
        const result = await SendCodeApi({
            type: store.getState().account.email ? 2 : 1,
            scene: 5,
            email: store.getState().account.email,
            phone:store.getState().account.phone,
            phone_prefix:store.getState().account.phone_prefix
        });
        const { code } = result;
        if (code !== 200) {
            Toast.show(result.message);
            return;
        };
        setDrawSafe({
            ...drawSafe,
            code: result.data.code
        });
        // 验证码发送成功
        Toast.show(t('message.send_code_success'));
        countDown()
    }
    //useHistory() 等同于Vue的this.$router
    const history = useHistory();
    //提现
    const withdrawCoin = async () => {
        if (!drawSafe.password) {
            //请输入交易密码
            Toast.show(t('public.enter_tarde_pass'));
            return;
        };
        if (!drawSafe.code) {
            //请输入邮箱验证码
            Toast.show(t('public.enter_code'));
            return;
        };
        //Token提现
        const token = async (): Promise<IResponse> => {
            const params = {
                type: 'USDT_TRC20',
                channel_id: props.channel_id_parent,
                channel_item_id: props.channel_id,
                amount: props.num,
                input_data: {
                    address: props.address,
                },

                // coin: props.coin,
                // protocol: props.network,
                // address: props.address,
                // amount: props.num,
                pay_password: drawSafe.password,
                email_code: drawSafe.code
            };
            const result = await WithdrawApiNew(params);
            setLoading(false)
            return result;
        };
        //法币提现
        const fiat = async (): Promise<IResponse> => {
            const params = {
                type: "OnLine",
                channel_id: props.channel_id_parent,
                channel_item_id: props.channel_id,
                amount: Number((Number(props.num) * Number(props.fiat_rate)).toFixed(0)),
                input_data: {
                    acc_no: props.address,
                    acc_name: props.card_name
                },
                pay_password: drawSafe.password,
                email_code: drawSafe.code
            };
            const result = await WithdrawApiNew(params);
            setLoading(false)
            return result
        };
        setLoading(true)
        const result = props.type === 1 ? await fiat() : await token();
        const { code } = result;
        if (code !== 200) {
            Toast.show(result.message);
            return;
        };
        //提币申请成功
        Toast.show(t('message.withdraw_application'));
        props.closeSafeBox();
        const amount: number = Number((Number(props.num) * Number(props.fiat_rate)).toFixed(4));
        const action = UpWithdraw({ coin: String(props.coin), num: props.type === 1 ? amount : Number(props.num), address: String(props.address), fee: Number(props.fee) });
        store.dispatch(action)
        history.push({
            pathname: '/withdraw-detail',
        })
    }
    return (
        <div className="sage-auth-withdraw">
            <div className="safe-title">
                <p>
                    {/* 安全验证 */}
                    {t('public.safe_auth')}
                </p>
                <p onClick={() => { props.closeSafeBox() }}><CloseOutline /></p>
            </div>
            {/* 交易密码 */}
            <div className="auth-inp-box">
                <p className="inp-lable">
                    <span>
                        {/* 交易密码 */}
                        {(t('public.trade_pass'))}
                    </span>
                    <span className="click-span" onClick={() => { props.closeSafeBox(); history.push('/assets-lock') }}>{t('public.forget')}?</span>
                </p>
                <input type="password" value={drawSafe.password} onChange={(e) => {
                    setDrawSafe({
                        ...drawSafe,
                        password: e.target.value
                    })
                }} placeholder={t('public.enter_tarde_pass')} />
            </div>
            {/* 邮箱验证码 */}
            <div className="auth-inp-box">
                <p className="inp-lable">
                    <span>
                        {/* 验证码 */}
                        {t('public.code')}
                    </span>
                </p>
                <input type="number" value={drawSafe.code} onChange={(e) => {
                    setDrawSafe({
                        ...drawSafe,
                        code: e.target.value
                    })
                }} placeholder={t('public.enter_code')} />
                <p onClick={() => {
                    count === 60 ? sendCodeEv() : console.log(1)
                }} className={`send-code ${count !== 60 ? 'un-send' : ''}`}>{count === 60 ? t('public.send_code') : `${count}s`}</p>
            </div>
            <p className="submit-auth">
                <Button color="primary" loading={loading} disabled={loading} block onClick={async () => {
                    withdrawCoin()
                }}>
                    {/* 确认 */}
                    {t('public.confirm')}
                </Button>
            </p>
        </div>
    )
}

const DrawBtn = (props: Props): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [safeBox, setSafeBox] = useState<boolean>(false);
    return (
        <div className="draw-btn-mine">
            <div className="amount-info">
                {
                    props.type === 1
                        ? <p>&asymp;&nbsp;{props.coin ? props.coin : ' Not select'}</p>
                        : <p>
                            {/* 实际到账 */}
                            {
                                t('public.cardit')
                            }
                        </p>
                }
                <p>
                    {/* @ts-ignore */}
                    <span>{props.num > 0 ? props.type === 1 ? (props.num * props.fiat_rate).toFixed(4) : (props.num - props.fee).toFixed(4) : '0.0000'}</span>
                    <span>{props.coin}</span>
                </p>
            </div>
            <Popup visible={safeBox} onMaskClick={(): void => {
                setSafeBox(false)
            }}>
                <SafeAuth closeSafeBox={(): void => {
                    setSafeBox(false)
                }} type={props.type} card_name={props.card_name} fiat_rate={props.fiat_rate} channel_id={props.channel_id} channel_id_parent={props.channel_id_parent} coin={props.coin} network={props.network} num={props.num} address={props.address} fee={props.fee} />
            </Popup>
            <Button color="primary" disabled={props.disable} onClick={(): void => {
                if (!props.bank_name && props.type === 1) {
                    //请选择银行
                    Toast.show('Please select a bank');
                    return;
                };
                if (!props.card_name && props.type === 1) {
                    //请输入持卡人姓名
                    Toast.show('Please enter the cardholder name');
                    return;
                };
                if (!props.address) {
                    //请输入提币地址
                    Toast.show(t(`message.${props.type === 1 ? 'enter_bank_num' : 'type_address'}`));
                    return;
                };
                if (!props.num) {
                    //请输入提币金额
                    Toast.show(t('message.type_withdraw_amount'));
                    return;
                };
                /* @ts-ignore */
                if (props.num < props.min) {
                    //未满足最少提币数量
                    Toast.show(t('message.withdraw_limit_faild'));
                    return;
                }
                setSafeBox(true);
            }}>
                {/* 提币 */}
                {
                    t('public.withdraw')
                }
            </Button>
        </div>
    )
};

export default React.memo(DrawBtn);