import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import { List, Popup, Toast } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { CoinsListApi, RechargeAddressApi } from '../../../../request/api'
import './index.scss';
import { upFooterStatus } from "../../../../store/app/action_creators";
import store from "../../../../store";
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode.react'

interface Coin {
    coin: string,
    protocol: string,
    min: number,
    address: string,
}
const RechargeIndex = (props:any): ReactElement<ReactNode> => {
    const [coinTypeBox, setCoinTypeBox] = useState<boolean>(false);
    const [coinProBox, setCoinProBox] = useState<boolean>(false);
    const [coinList, setCoinList] = useState<any>([]);
    const [protocolList, setProtocolList] = useState<string[]>(['ERC20', 'TRC20']);
    const [selectCoinMsg, setSelectMsg] = useState<Coin>({
        coin: 'USDT',
        protocol: 'TRC20',
        min: 1,
        address: '',
    });
    const getCoins = useCallback(async () => {
        const result = await CoinsListApi();
        const arr: any = [];
        for (let i in result.data.coins) {
            arr.push(result.data.coins[i][0]);
        };
        setCoinList(arr)
    }, [])

    const getAddress = useCallback(async () => {
        const result = await RechargeAddressApi({
            coin: selectCoinMsg.coin,
            protocol: selectCoinMsg.protocol
        });
        setSelectMsg({
            ...selectCoinMsg,
            address: result.data.address
        })
    }, [])
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action)
        getCoins();
        getAddress();
        return () => {
            getCoins();
            getAddress();
        }
    }, [props]);
    useEffect(() => {
        getAddress();
    }, [selectCoinMsg.coin, selectCoinMsg.protocol])
    const closeProBox = () => {
        setCoinProBox(false)
    };
    const closeCoinBox = () => {
        setCoinTypeBox(false)
    };

    const { t } = useTranslation();
    return (
        <div className="recharge-index">
            {/* 充币 */}
            <InnerNav leftArrow title={t('public.recharge')} />
            <div className="charge-msg">
                <List>
                    <List.Item extra={selectCoinMsg.coin} onClick={() => { setCoinTypeBox(true) }}>
                        {/* 币种 */}
                        {t('public.coin')}
                    </List.Item>
                    <List.Item extra={`${selectCoinMsg.coin}-${selectCoinMsg.protocol}`} onClick={() => { setCoinProBox(true) }}>
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
                    {selectCoinMsg.coin}</p>
                <QRCode value={selectCoinMsg.address} size={180} id="qrCode" />
                <p className="charge-address-title">
                    {/* 充值地址 */}
                    {t('public.recharge_address')}
                </p>
                <p className="charge-address">{selectCoinMsg.address}</p>
                <div className="copy-btn" onClick={() => {
                    copy(selectCoinMsg.address);
                    Toast.show('地址复制成功')
                }}>
                    {/* 复制 */}
                    {t('public.copy')}
                </div>
            </div>
            <div className="charge-remark">
                <p className="remark-title">
                    {/* 充值说明 */}
                    {t('public.recharge_remark')}:</p>
                <p className="remark-text">1. {t('public.recharge_remark_1')}({`${selectCoinMsg.coin}-${selectCoinMsg.protocol}`}){t('public.recharge_remark_1_1')}</p>
                <p className="remark-text">2. {t('public.recharge_remark_2')}</p>
                <p className="remark-text">3. {t('public.recharge_remark_3')}{selectCoinMsg.min}</p>
            </div>
            {/* 选择充值币种 */}
            <Popup onMaskClick={() => { closeCoinBox() }} visible={coinTypeBox}>
                <div className="select-coin-popup">
                    <ul>
                        {
                            coinList.map((e: any, index: number): ReactElement => {
                                return (
                                    <li key={index} onClick={() => {
                                        setProtocolList(e.protocol_list);
                                        setSelectMsg({
                                            ...selectCoinMsg,
                                            coin: e.coin,
                                            min: e.deposit_min,
                                            protocol: e.protocol_list[0],
                                        });
                                        closeCoinBox()
                                    }}>{e.coin}</li>
                                )
                            })
                        }
                    </ul>
                    <div className="cancel-popup" onClick={() => {
                        closeCoinBox()
                    }}>取消</div>
                </div>
            </Popup>
            {/* 选择充值网络 */}
            <Popup visible={coinProBox} onMaskClick={() => { closeProBox() }}>
                <div className="select-coin-popup">
                    <ul>
                        {
                            protocolList.map((e: any, index: number): ReactElement => {
                                return (
                                    <li key={index} onClick={() => {
                                        setSelectMsg({
                                            ...selectCoinMsg,
                                            protocol: e
                                        });
                                        closeProBox()
                                    }}>{e}</li>
                                )
                            })
                        }
                    </ul>
                    <div className="cancel-popup" onClick={() => {
                        closeProBox()
                    }}>取消</div>
                </div>
            </Popup>
        </div>
    )
};

export default RechargeIndex;