import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import { CloseOutline, FileOutline } from 'antd-mobile-icons'
import DrawBtn from "./components/draw_btn";
import { Button, Modal, PickerView, Popup } from "antd-mobile";
import './index.scss'
import { DownFill } from "antd-mobile-icons";
import { useTranslation } from 'react-i18next'
import { CoinsListApi, UserAssetsApi } from '../../../../request/api';
import store from "../../../../store";
import { setChainMsg, upFooterStatus } from "../../../../store/app/action_creators";
import { useHistory } from "react-router-dom";


interface TypeMsg {
    drawAddress: string,
    drawNum: number | string,
    selectCoin: boolean,
    netWork: string,
    fee: number,
    withdraw_min: number,
    withdraw_max: number,
}


interface PropsSelect {
    closeSelect: () => void,
    onSelect: (value: string[]) => void,
    onSelectCoin: (value: string) => void,
    t: any,
    coinList: any[],
}


const WithdrawIndex = (): ReactElement<ReactNode> => {
    const [sourceCoin, setSourceCoin] = useState<any[]>([]);
    const [coinList, setCoinList] = useState<any[][]>([]);
    const { t } = useTranslation();
    const history = useHistory();
    //Hooks提供的Api均可带入泛型
    //币种
    const [currentCoin, setCurrentCoin] = useState<any>('USDT');
    //币种支持网络
    const [coinNet, setCoinNet] = useState<string[]>();
    //选择网络
    const [currentNet, setCurrentNet] = useState<string>('TRC20');
    //当前币种余额
    const [currentBalance, setCurrentBalance] = useState<number>(store.getState().currentBalance);
    //是否设置交易密码
    const [isPayPass, setIsPayPass] = useState<boolean>(false);
    const [drawMsg, setDrawMsg] = useState<TypeMsg>({
        drawAddress: sessionStorage.getItem('selectAddress') || '',//充值地址
        drawNum: '',//充值数量
        selectCoin: false,//选择币种弹出层
        netWork: 'TRC20',//网络名称
        fee: 6,//手续费
        withdraw_min: 10,//限额
        withdraw_max: 9999,//限额
    });
    const [proKey, setProKey] = useState<number>(0);
    //获取币种列表
    const getCoinList = useCallback(async () => {
        const result = await CoinsListApi();
        //币种名称列表
        const arr = [];
        //源数据列表
        const arr2 = [];
        for (let i in result.data.coins) {
            arr.push(result.data.coins[i][0].coin);
            arr2.push(result.data.coins[i][0]);
        };
        setCoinList([arr]);
        setSourceCoin(arr2);
    }, []);
    const getBalance = useCallback(async (_val: string) => {
        const result = await UserAssetsApi();
        for (let i in result.data) {
            if (result.data[i].coin === _val) {
                setCurrentBalance(result.data[i].available)
            }
        }
    }, []);
    useEffect(() => {
        getBalance(currentCoin);
        sourceCoin.forEach(e => {
            if (e.coin === currentCoin) {
                setCoinNet(e.protocol_list);
                setDrawMsg({
                    ...drawMsg,
                    drawNum: '',
                    netWork: e.protocol_list[0],
                    fee: e.withdraw_fee_list[0],
                    withdraw_min: e.withdraw_min_list[0],
                    withdraw_max: e.withdraw_max_list[0],
                })
            }
        })
    }, [currentCoin]);
    useEffect(() => {
        sourceCoin.forEach(e => {
            if (e.coin === currentCoin) {
                setDrawMsg({
                    ...drawMsg,
                    drawNum: '',
                    fee: e.withdraw_fee_list[proKey],
                    withdraw_min: e.withdraw_min_list[proKey],
                    withdraw_max: e.withdraw_max_list[proKey],
                })
            }
        })
    }, [currentNet]);
    const storeChange = () => {
        store.subscribe(() => {
            /* @ts-ignore */
            if (store.getState().account.security.pay_password == 0) {
                setIsPayPass(true);
            }
        })
    }
    useEffect(() => {
        setCoinNet(['TRC20', 'ERC20'])
        getCoinList();
        const action = upFooterStatus(0);
        store.dispatch(action);
        storeChange();
        return () => {
            getCoinList();
            getBalance('USDT');
            storeChange();
            setSourceCoin([]);
            setCoinList([]);
            sessionStorage.removeItem('selectAddress');
        }
    }, []);
    const closePopup = () => {
        setDrawMsg({
            ...drawMsg,
            selectCoin: false,
        })
    }
    return (
        <div className="with-draw">
            <InnerNav leftArrow title={t('public.withdraw')} />
            <div className="draw-msg">
                {/* 选择币种 */}
                <div className="msg-option" onClick={(): void => {
                    setDrawMsg({
                        ...drawMsg,
                        selectCoin: true,
                    })
                }}>
                    <p className="option-lable">
                        {/* 币种 */}
                        {t('public.coin')}
                    </p>
                    <input type="text" disabled value={currentCoin} />
                    <span className="icon-inp"><DownFill /></span>
                </div>
                {/* 提币网络 */}
                <div className="msg-option">
                    <p className="option-lable un-lable-margin">
                        {/* 可用网络 */}
                        {t('public.use_net')}
                    </p>
                    <ul className="net-list">
                        {
                            coinNet?.map((el: any, index: number): ReactElement => {
                                return (
                                    <li key={index} className={`${currentNet === el ? 'active-network' : ''}`} onClick={() => {
                                        setCurrentNet(el);
                                        setProKey(index)
                                        setDrawMsg({
                                            ...drawMsg,
                                            netWork: el,
                                        })
                                    }}>
                                        {el}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* 提币地址 */}
                <div className="msg-option">
                    <p className="option-lable">
                        {/* 提币地址 */}
                        {t('public.withdraw_address')}
                    </p>
                    <input type="text" style={{fontSize:'12px'}} placeholder={t('public.address_paste')} value={drawMsg?.drawAddress} onChange={(e) => {
                        setDrawMsg({
                            ...drawMsg,
                            drawAddress: e.target.value,
                        })
                    }} />
                    <span className="oper-icon" onClick={() => {
                        const params = {
                            coin: currentCoin,
                            protocol: drawMsg.netWork
                        };
                        const action = setChainMsg(params);
                        store.dispatch(action);
                        history.push('/address-mange')
                    }}><img src={require('../../../../assets/images/book_icon.png')} /></span>
                </div>
                {/* 提币数量 */}
                <div className="msg-option">
                    <p className="option-lable">
                        {/* 提币数量 */}
                        {t('public.withdraw_num')}
                    </p>
                    <input type="number" placeholder={`${t('public.min')}${Number(drawMsg.withdraw_min).toFixed(8)}`} value={drawMsg?.drawNum} onChange={(e) => {
                        setDrawMsg({
                            ...drawMsg,
                            drawNum: e.target.value,
                        })
                    }} />
                    <p className="inp-remark">
                        <span>{currentCoin}</span>
                        <span></span>
                        <span className="click-span" onClick={() => {
                            setDrawMsg({
                                ...drawMsg,
                                drawNum: currentBalance
                            })
                        }}>
                            {/* 全部 */}
                            {t('public.all')}
                        </span>
                    </p>
                    <p className="option-remark">
                        <span>{t('public.use_balance')}:{currentBalance.toFixed(4)} {currentCoin}</span>
                        <span>{t('public.fee')}:{Number(drawMsg.fee).toFixed(8)} {currentCoin}</span>
                    </p>
                </div>
                <div className="draw-attention">
                    <ul>
                        <li>{t('public.withdraw_remark_1')}</li>
                        <li>{t('public.withdraw_remark_2')}</li>
                        <li>{t('public.withdraw_remark_3')}:{drawMsg.withdraw_min}-{drawMsg.withdraw_max} {currentCoin}({drawMsg.netWork})</li>
                    </ul>
                </div>
            </div>
            {/* 选择币种 */}
            <Popup visible={drawMsg.selectCoin} onMaskClick={(): void => {
                closePopup()
            }}>
                <div className="select-popup-mine">
                    <p onClick={() => { closePopup() }}>
                        <CloseOutline />
                    </p>
                    <PickerView columns={coinList} value={[currentCoin]} onChange={(e) => {
                        setCurrentCoin(e[0]);
                    }} />
                    <div onClick={() => { closePopup() }}>
                        <Button color="primary" block>{t('public.confirm')}</Button>
                    </div>
                </div>
            </Popup>
            {/* 提币按钮 */}
            <DrawBtn coin={currentCoin} network={currentNet} num={Number(drawMsg.drawNum)} address={drawMsg.drawAddress} min={drawMsg.withdraw_min} fee={drawMsg.fee} />
            {/* 是否设置了交易密码 */}
            <Modal visible={isPayPass} title="提示" content={<div className="un-bind-pay">
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
        </div>
    )
};

export default WithdrawIndex;