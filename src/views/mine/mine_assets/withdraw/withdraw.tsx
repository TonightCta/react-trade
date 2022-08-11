import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import DrawBtn from "./components/draw_btn";
import { Popup } from "antd-mobile";
import './index.scss'
import { DownFill } from "antd-mobile-icons";
import { useTranslation } from 'react-i18next'
import { CoinsListApi, UserAssetsApi } from '../../../../request/api';
import store from "../../../../store";


interface TypeMsg {
    drawAddress: string,
    drawNum: number | string,
    selectCoin: boolean,
    netWork: string
}


interface PropsSelect {
    closeSelect: () => void,
    onSelect: (value: string[]) => void,
    onSelectCoin: (value: string) => void,
    t: any,
    coinList: any[],
}


const SelectOption = (props: PropsSelect): ReactElement => {
    return (
        <div className="select-coin">
            <ul>
                {
                    props.coinList.map((el: any, index): ReactElement => {
                        return (
                            <li key={index} onClick={(): void => {
                                props.onSelect(el.protocol_list);
                                props.onSelectCoin(el.coin);
                                props.closeSelect();
                            }}>{el.coin}</li>
                        )
                    })
                }
            </ul>
            <div className="close-select" onClick={(): void => {
                props.closeSelect()
            }}>
                {/* 取消 */}
                {props.t('public.cancel')}
            </div>
        </div>
    )
};


const WithdrawIndex = (): ReactElement<ReactNode> => {
    const [coinList, setCoinList] = useState<any>([]);
    const { t } = useTranslation();
    //Hooks提供的Api均可带入泛型
    //币种
    const [currentCoin, setCurrentCoin] = useState<string>('USDT');
    //币种支持网络
    const [coinNet, setCoinNet] = useState<string[]>();
    //选择网络
    const [currentNet, setCurrentNet] = useState<string>('ERC20');
    //当前币种余额
    const [currentBalance, setCurrentBalance] = useState<number>(store.getState().currentBalance)
    const [drawMsg, setDrawMsg] = useState<TypeMsg>({
        drawAddress: '',//充值地址
        drawNum: '',//充值数量
        selectCoin: false,//选择币种弹出层
        netWork: 'ERC20',//网络名称
    });
    //获取币种列表
    const getCoinList = useCallback(async () => {
        const result = await CoinsListApi();
        const arr = [];
        for (let i in result.data.coins) {
            arr.push(result.data.coins[i][0]);
        };
        setCoinList(arr);
    }, []);
    useEffect(() => {
        setCoinNet(['ERC20', 'TRC20'])
        getCoinList();
        return () => {
            setCurrentBalance(store.getState().currentBalance);
            setCoinList([]);
        }
    }, []);
    const getBalance = useCallback(async (_val: string) => {
        const result = await UserAssetsApi();
        for (let i in result.data) {
            if (result.data[i].coin === _val) {
                setCurrentBalance(result.data[i].available)
            }
        }
    }, []);
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
                    <input type="text" placeholder={t('public.address_paste')} value={drawMsg?.drawAddress} onChange={(e) => {
                        setDrawMsg({
                            ...drawMsg,
                            drawAddress: e.target.value,
                        })
                    }} />
                </div>
                {/* 提币数量 */}
                <div className="msg-option">
                    <p className="option-lable">
                        {/* 提币数量 */}
                        {t('public.withdraw_num')}
                    </p>
                    <input type="number" placeholder={`${t('public.min')}20`} value={drawMsg?.drawNum} onChange={(e) => {
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
                        <span>{t('public.fee')}:0.0005 {currentCoin}</span>
                    </p>
                </div>
                <div className="draw-attention">
                    <ul>
                        <li>{t('public.withdraw_remark_1')}</li>
                        <li>{t('public.withdraw_remark_2')}</li>
                        <li>{t('public.withdraw_remark_3')}:10-10,000 {currentCoin}({drawMsg.netWork})</li>
                    </ul>
                </div>
            </div>
            {/* 选择币种 */}
            <Popup visible={drawMsg.selectCoin} onMaskClick={(): void => {
                setDrawMsg({
                    ...drawMsg,
                    selectCoin: false,
                })
            }}>
                <SelectOption coinList={coinList} closeSelect={(): void => {
                    setDrawMsg({
                        ...drawMsg,
                        selectCoin: false,
                    })
                }} onSelect={(value: string[]): void => {
                    setCoinNet(value);
                    setCurrentNet(value[0]);
                    setDrawMsg({
                        ...drawMsg,
                        netWork: value[0],
                    })
                }} onSelectCoin={(value: string): void => {
                    setCurrentCoin(value);
                    getBalance(value)
                }} t={t} />
            </Popup>
            {/* 提币按钮 */}
            <DrawBtn coin={currentCoin} network={currentNet} num={drawMsg.drawNum} address={drawMsg.drawAddress} fee={0.2} />
        </div>
    )
};

export default WithdrawIndex;