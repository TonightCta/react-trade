import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import DrawBtn from "./components/draw_btn";
import { Popup } from "antd-mobile";
import './index.scss'
import { DownFill } from "antd-mobile-icons";
import { useTranslation } from 'react-i18next'
import { t } from "i18next";

interface CoinNet {
    name: string,
    key: number
}

interface TypeMsg {
    drawAddress: string,
    drawNum: number | string,
    selectCoin: boolean,
    netWork: string
}

interface PropsSelect {
    closeSelect: () => void,
    onSelect: (value: Array<CoinNet>) => void,
    onSelectCoin: (value: string) => void,
    t: any
}
const coinList = [
    {
        name: 'USDT',
        net: [
            {
                name: 'ERC20',
                key: 1,
            },
            {
                name: 'TRC20',
                key: 2,
            },
        ]
    },
    {
        name: 'ETH',
        net: [
            {
                name: 'E-Network',
                key: 1,
            },
        ]
    },
    {
        name: 'BTC',
        net: [
            {
                name: 'B-Network',
                key: 1,
            },
            {
                name: 'OMNL',
                key: 2,
            },
        ]
    },
]

const SelectOption = (props: PropsSelect): ReactElement => {
    return (
        <div className="select-coin">
            <ul>
                {
                    coinList.map((el, index): ReactElement => {
                        return (
                            <li key={index} onClick={(): void => {
                                props.onSelect(el.net);
                                props.onSelectCoin(el.name);
                                props.closeSelect();
                            }}>{el.name}</li>
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
    const { t } = useTranslation();
    //Hooks提供的Api均可带入泛型
    //币种
    const [currentCoin, setCurrentCoin] = useState<string>('USDT');
    //币种支持网络
    const [coinNet, setCoinNet] = useState<CoinNet[]>();
    //选择网络
    const [currentNet, setCurrentNet] = useState<number>(1);
    const [drawMsg, setDrawMsg] = useState<TypeMsg>({
        drawAddress: '',//充值地址
        drawNum: '',//充值数量
        selectCoin: false,//选择币种弹出层
        netWork: 'ERC20',//网络名称
    });
    // useEffect 第一个参数为函数，第二个参数为空数组时对应Vue的Created()周期，数组内传值则为监听值变化执行第一个参数(函数)逻辑，可传多个值同时监听
    // useEffect 第二个参数传空数组，第一个参数(函数)内return一个值或者函数对应Vue的Destory()周期
    // 与useEffect同功能但性能较好的是useMemo,对应Vue的computed
    //详细例子看./components/draw_btn.tsx
    useEffect((): void => {
        setCoinNet([
            {
                name: 'ERC20',
                key: 1
            },
            {
                name: 'TRC20',
                key: 2
            },
        ])
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
                            coinNet?.map((el: CoinNet, index: number): ReactElement => {
                                return (
                                    <li key={index} className={`${currentNet === el.key ? 'active-network' : ''}`} onClick={() => {
                                        setCurrentNet(el.key);
                                        setDrawMsg({
                                            ...drawMsg,
                                            netWork: el.name,
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
                        <span className="click-span">
                            {/* 全部 */}
                            {t('public.all')}
                        </span>
                    </p>
                    <p className="option-remark">
                        <span>{t('public.use_balance')}:10.2546465484 {currentCoin}</span>
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
                <SelectOption closeSelect={(): void => {
                    setDrawMsg({
                        ...drawMsg,
                        selectCoin: false,
                    })
                }} onSelect={(value: Array<CoinNet>): void => {
                    setCoinNet(value);
                    setCurrentNet(1);
                    setDrawMsg({
                        ...drawMsg,
                        netWork: value[0]!.name,
                    })
                }} onSelectCoin={(value: string): void => {
                    setCurrentCoin(value)
                }} t={t} />
            </Popup>
            {/* 提币按钮 */}
            <DrawBtn coin={currentCoin} num={drawMsg.drawNum} address={drawMsg.drawAddress} fee={0.2} />
        </div>
    )
};

export default WithdrawIndex;