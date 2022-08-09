import { Button } from "antd-mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactElement, ReactNode } from "react";
import { Popup } from 'antd-mobile'
import { CloseOutline } from "antd-mobile-icons";
import { useHistory } from 'react-router-dom';
import { WithdrawCoinMsg } from '../../../../../utils/types';
import { useTranslation } from 'react-i18next'

interface Props extends WithdrawCoinMsg { }

interface PropsSafe extends WithdrawCoinMsg {
    closeSafeBox: () => void;
}

const SafeAuth = (props: PropsSafe): ReactElement => {
    const { t } = useTranslation();
    // useRef等同于Vue3的ref()，自己查查看
    const [count, setCount] = useState<number>(60);
    const cbSaver: any = useRef();
    const timer = useRef<NodeJS.Timer>();
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

    //useHistory() 等同于Vue的this.$router
    const history = useHistory();
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
                    <span className="click-span" onClick={() => { props.closeSafeBox(); history.push('/forget') }}>{t('public.forget')}?</span>
                </p>
                <input type="text" placeholder={t('public.enter_tarde_pass')} />
            </div>
            {/* 邮箱验证码 */}
            <div className="auth-inp-box">
                <p className="inp-lable">
                    <span>
                        {/* 验证码 */}
                        {t('public.code')}
                    </span>
                </p>
                <input type="number" placeholder={t('public.enter_code')} />
                <p onClick={() => {
                    count === 60 ? countDown() : console.log(1)
                }} className={`send-code ${count !== 60 ? 'un-send' : ''}`}>{count === 60 ? t('public.send_code') : `${count}s${t('public.send_code')}`}</p>
            </div>
            <p className="submit-auth">
                <Button color="primary" block onClick={() => {
                    props.closeSafeBox();
                    history.push({
                        pathname: '/withdraw-detail',
                        search: JSON.stringify({ coin: props.coin, num: props.num, address: props.address, fee: props.fee })
                    })
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
                <p>
                    {/* 实际到账 */}
                    {
                        t('public.cardit')
                    }
                </p>
                <p>
                    <span>0.0000</span>
                    <span>{props.coin}</span>
                </p>
            </div>
            <Popup visible={safeBox} onMaskClick={(): void => {
                setSafeBox(false)
            }}>
                <SafeAuth closeSafeBox={(): void => {
                    setSafeBox(false)
                }} coin={props.coin} num={props.num} address={props.address} fee={props.fee} />
            </Popup>
            <Button color="primary" onClick={(): void => {
                setSafeBox(true)
                console.log(props)
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