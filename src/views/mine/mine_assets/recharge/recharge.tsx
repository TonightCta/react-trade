import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import { Button, List, PickerView, Popup, Toast } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { CoinsListApi, RechargeAddressApi } from '../../../../request/api'
import './index.scss';
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode.react'
import { CloseOutline } from "antd-mobile-icons";

interface Coin {
    coin: string,
    protocol: string,
    min: number,
    address: string,
};
const RechargeIndex = (props: any): ReactElement<ReactNode> => {
    const [coinTypeBox, setCoinTypeBox] = useState<boolean>(false);
    const [coinProBox, setCoinProBox] = useState<boolean>(false);
    const [sourceCoin, setSourceCoin] = useState<any[]>([]);
    const [coinList, setCoinList] = useState<any[][]>([]);
    const [selectCoin, setSelectCoin] = useState<string | null>('USDT');
    const [defaultNet, setDefaultNet] = useState<string | null>('TRC20');
    const [protocolList, setProtocolList] = useState<any[][]>([]);
    const [selectCoinMsg, setSelectMsg] = useState<Coin>({
        coin: 'USDT',
        protocol: 'TRC20',
        min: 1,
        address: '',
    });
    const getCoins = useCallback(async () => {
        const result = await CoinsListApi();
        const arr: any = [];
        const arr2: any = [];
        for (let i in result.data.coins) {
            arr.push(result.data.coins[i][0].coin);
            arr2.push(result.data.coins[i][0])
        };
        setSourceCoin(arr2);
        setCoinList([arr]);
        setProtocolList([['TRC20', 'ERC20']])
    }, [])

    const getAddress = async () => {
        const result = await RechargeAddressApi({
            coin: selectCoin as string,
            protocol: defaultNet
        });
        setSelectMsg({
            ...selectCoinMsg,
            address: result.data.address
        })
    }
    useEffect(() => {
        getCoins();
        return () => {
            setSourceCoin([]);
            setCoinList([]);
            setProtocolList([]);
        }
    }, [props]);
    useEffect(() => {
        getAddress();
    }, [defaultNet]);
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
                    <List.Item extra={selectCoin} onClick={() => { setCoinTypeBox(true) }}>
                        {/* 币种 */}
                        {t('public.coin')}
                    </List.Item>
                    <List.Item extra={`${selectCoin}-${defaultNet}`} onClick={() => { setCoinProBox(true) }}>
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
                    {selectCoin}</p>
                <QRCode value={selectCoinMsg.address} size={180} id="qrCode" />
                <p className="charge-address-title">
                    {/* 充值地址 */}
                    {t('public.recharge_address')}
                </p>
                <p className="charge-address">{selectCoinMsg.address}</p>
                <div className="copy-btn" onClick={() => {
                    copy(selectCoinMsg.address);
                    //地址复制成功
                    Toast.show(t('message_copy_address'))
                }}>
                    {/* 复制 */}
                    {t('public.copy')}
                </div>
            </div>
            <div className="charge-remark">
                <p className="remark-title">
                    {/* 充值说明 */}
                    {t('public.recharge_remark')}:</p>
                <p className="remark-text">1. {t('public.recharge_remark_1')}</p>
                <p className="remark-text">2. {t('public.recharge_remark_2')}</p>
                <p className="remark-text">3. {t('public.recharge_remark_3')}{selectCoinMsg.min}</p>
            </div>
            {/* 选择充值币种 */}
            <Popup onMaskClick={() => { closeCoinBox() }} visible={coinTypeBox}>
                <div className="select-coin-popup">
                    <p onClick={() => {
                        closeCoinBox()
                    }}>
                        <CloseOutline />
                    </p>
                    <PickerView columns={coinList} value={[selectCoin]} onChange={(e) => {
                        // setSelectCoin(e[0]);
                    }} />
                    <div className="coin-select">
                        <Button color="primary" block onClick={() => {
                            sourceCoin.forEach((e) => {
                                if (e.coin === selectCoin) {
                                    setDefaultNet(e.protocol_list[0])
                                    setProtocolList([e.protocol_list]);
                                    setSelectMsg({
                                        ...selectCoinMsg,
                                        min: e.deposit_min,
                                    });
                                    closeCoinBox();
                                };
                            })
                        }}>{t('public.confirm')}</Button>
                    </div>
                </div>
            </Popup>
            {/* 选择充值网络 */}
            <Popup visible={coinProBox} onMaskClick={() => { closeProBox() }}>
                <div className="select-coin-popup">
                    <p onClick={() => { closeProBox() }}>
                        <CloseOutline />
                    </p>
                    <PickerView columns={protocolList} value={[defaultNet]} onChange={(e) => {
                        // setDefaultNet(e[0]);
                    }} />
                    <div className="coin-select">
                        <Button color="primary" block onClick={() => {
                            closeProBox()
                        }}>{t('public.confirm')}</Button>
                    </div>
                </div>
            </Popup>
        </div>
    )
};

export default RechargeIndex;