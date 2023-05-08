import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import { CloseOutline } from 'antd-mobile-icons'
import DrawBtn from "./components/draw_btn";
import { Button, Modal, PickerView, Popup, Toast } from "antd-mobile";
import './index.scss'
// import { DownFill } from "antd-mobile-icons";
import { useTranslation } from 'react-i18next'
import { CoinsListApi, GetSlugApi, WithdrawNetApi } from '../../../../request/api';
import store from "../../../../store";
import { setChainMsg } from "../../../../store/app/action_creators";
import { useHistory } from "react-router-dom";


interface TypeMsg {
    drawAddress: string,
    drawNum: number | string,
    selectCoin: boolean,
    netWork: string,
    fee: number,
    withdraw_min: number,
    withdraw_max: number,
    channel_id: number,
    channel_id_parent: number,
    rate: number
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
    //选择网络
    const [currentNet, setCurrentNet] = useState<string>('');
    //当前币种余额
    const [currentBalance, setCurrentBalance] = useState<number>(store.getState().currentBalance);
    const [slug, setSlug] = useState<string>('');
    //是否设置交易密码
    const [isPayPass, setIsPayPass] = useState<boolean>(false);
    const [drawMsg, setDrawMsg] = useState<TypeMsg>({
        drawAddress: sessionStorage.getItem('selectAddress') || '',//充值地址
        drawNum: '',//充值数量
        selectCoin: false,//选择币种弹出层
        netWork: '',//网络名称
        fee: 0,//手续费
        withdraw_min: 10,//限额
        withdraw_max: 9999,//限额
        channel_id: 0,
        channel_id_parent: 0,
        rate: 0,
    });
    const [isWithdraw,setIsWithdraw] = useState<boolean>(false);
    // const [proKey, setProKey] = useState<number>(0);
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
    const getWithdrawRemark = async () => {
        const result = await GetSlugApi('WITHDRAW_HINT');
        setSlug(result.data.content)
    }
    // const getBalance = useCallback(async (_val: string) => {
    //     const result = await UserAssetsApi();
    //     for (let i in result.data) {
    //         console.log(result.data[i])
    //         if (result.data[i].chain === _val) {
    //             setCurrentBalance(result.data[i].available);
    //         }
    //     }
    // }, []);
    const [netList, setNetList] = useState([]);
    const setNetListService = async () => {
        const result = await WithdrawNetApi();        
        const { data,code } = result;
        if(code !== 200){
            Toast.show(result.message);
            setIsWithdraw(true);
            return
        }
        data.list.forEach((item: any) => {
            if (item.type === 'USDT_TRC20') {
                setNetList(item.channel_list);
                setCurrentNet(item.channel_list[0].name);
                setDrawMsg({
                    ...drawMsg,
                    rate: item.rate,
                    netWork: item.channel_list[0].name,
                    withdraw_min: item.channel_list[0].min_money,
                    withdraw_max: item.channel_list[0].max_money,
                    channel_id: item.channel_list[0].id,
                    channel_id_parent: item.channel_list[0].withdraw_channel_id
                })
            }
        })
    }
    // useEffect(() => {
    //     // getBalance(currentNet);
    //     netList.forEach((e:{name:string,min_money:number,max_money:number}) => {
    //         if (e.name === currentNet) {
    //             setDrawMsg({
    //                 ...drawMsg,
    //                 drawNum: '',
    //                 withdraw_min: e.min_money,
    //                 withdraw_max: e.max_money,
    //             })
    //         }
    //     })
    // }, [currentNet]);
    // useEffect(() => {
    //     sourceCoin.forEach(e => {
    //         if (e.coin === currentCoin) {
    //             setDrawMsg({
    //                 ...drawMsg,
    //                 drawNum: '',
    //                 fee: e.withdraw_fee_list[proKey],
    //                 withdraw_min: e.withdraw_min_list[proKey],
    //                 withdraw_max: e.withdraw_max_list[proKey],
    //             })
    //         }
    //     })
    // }, [currentNet]);
    useEffect(() => {
        setDrawMsg({
            ...drawMsg,
            fee: Number(drawMsg.drawNum) * (drawMsg.rate / 100)
        });
        if (+drawMsg.drawNum > currentBalance) {
            Toast.show(t('message.last_balance'))
            setDrawMsg({
                ...drawMsg,
                drawNum: currentBalance,
            })
        }
    }, [drawMsg.drawNum])
    useEffect(() => {
        // setCoinNet(['TRC20', 'ERC20'])
        // getCoinList();
        /* @ts-ignore */
        setIsPayPass(store.getState().account.security.pay_password == 0 ? true : false);
        getWithdrawRemark();
        setNetListService();
        return () => {
            setSourceCoin([]);
            setCoinList([]);
            setSlug('');
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
                <div className="msg-option">
                    <p className="option-lable">
                        {/* 币种 */}
                        {t('public.coin')}
                    </p>
                    <input type="text" disabled value="USDT" onChange={() => { }} />
                </div>
                {/* 提币网络 */}
                <div className="msg-option">
                    <p className="option-lable un-lable-margin">
                        {/* 可用网络 */}
                        {t('public.use_net')}
                    </p>
                    <ul className="net-list">
                        {
                            netList?.map((el: any, index: number): ReactElement => {
                                return (
                                    <li key={index} className={`${currentNet === el.name ? 'active-network' : ''}`} onClick={() => {
                                        setCurrentNet(el.name);
                                        setDrawMsg({
                                            ...drawMsg,
                                            netWork: el.name,
                                            withdraw_min: el.min_money,
                                            withdraw_max: el.max_money
                                        })
                                    }}>
                                        {el.name}
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
                    <input type="text" style={{ fontSize: '12px' }} placeholder={t('public.address_paste')} value={drawMsg?.drawAddress} onChange={(e) => {
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
                    <input type="number" placeholder={`${t('public.min')} ${Number(drawMsg.withdraw_min).toFixed(4)}`} value={drawMsg?.drawNum} onChange={(e) => {
                        setDrawMsg({
                            ...drawMsg,
                            drawNum: e.target.value,
                        })
                    }} />
                    <p className="inp-remark">
                        <span>{currentNet}</span>
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
                        <span>{t('public.use_balance')}:&nbsp;{currentBalance.toFixed(4)} {currentNet}</span>
                        <span>{t('public.fee')}:&nbsp;{Number(drawMsg.fee).toFixed(4)} {currentNet}</span>
                    </p>
                </div>
                <div className="draw-attention">
                    <div className="danger-inner" dangerouslySetInnerHTML={{ __html: slug }}></div>
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
            <DrawBtn disable={isWithdraw} channel_id={drawMsg.channel_id} channel_id_parent={drawMsg.channel_id_parent} type={2} coin={currentNet} network={currentNet} num={Number(drawMsg.drawNum)} address={drawMsg.drawAddress} min={drawMsg.withdraw_min} fee={drawMsg.fee} />
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
        </div>
    )
};

export default WithdrawIndex;