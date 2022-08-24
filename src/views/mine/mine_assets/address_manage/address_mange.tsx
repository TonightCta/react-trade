import { Button, DotLoading, Empty, Popover, Toast } from "antd-mobile";
import { CloseOutline, QuestionCircleOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from '../../../../components/inner_nav/nav';
import store from "../../../../store";
import { SwipeAction, Popup } from 'antd-mobile';
import { useTranslation } from "react-i18next";
import { AddressListApi, AddAddressApi, RemoveAddressApi } from '../../../../request/api';
import { useHistory } from "react-router-dom";
import './index.scss';

interface upMsg {
    address: string,
    remark: string
}


const AddressManage = (): ReactElement<ReactNode> => {
    const [addressList, setAddress] = useState<any[]>([]);
    const [addBox, setAddBox] = useState<boolean>(false);
    const [defaultNet, setDefaultNet] = useState<string>(store.getState().chainMsg.protocol);
    const [netList, setNetlist] = useState<string[]>([store.getState().chainMsg.protocol]);
    const [dataTotal, setDataTotal] = useState<number>(1);
    const [inpMsg, setInpMsg] = useState<upMsg>({
        address: "",
        remark: ""
    })
    const { t } = useTranslation();
    const closePop = () => {
        setAddBox(false)
    };
    const getAdList = async () => {
        const params = {
            page: 1,
            limit: 200,
            search: {
                coin: store.getState().chainMsg.coin,
                protocol: store.getState().chainMsg.protocol
            }
        }
        const result = await AddressListApi(params);
        setDataTotal(result.data.total);
        setAddress(result.data.list);
    };
    useEffect(() => {
        getAdList();
        return () => {
            getAdList();
            setAddress([])
        }
    }, []);
    const history = useHistory();
    return (
        <div className="address-manage">
            <InnerNav leftArrow title={`${store.getState().chainMsg.coin}${t('public.address_manage')}`} />
            {
                dataTotal === 0
                    ? <Empty description={t('public.has_no_address')} />
                    : addressList.length > 0
                        ? <div className="address-list">
                            {
                                addressList.map((item: any, index: number): ReactElement => {
                                    return (
                                        <div className="list-content" key={index} onClick={() => {
                                            sessionStorage.setItem('selectAddress', item.address);
                                            history.goBack();
                                        }}>
                                            <SwipeAction rightActions={[
                                                {
                                                    key: 'delete',
                                                    text: t('public.delete'),
                                                    color: 'danger',
                                                },
                                            ]} onAction={async () => {
                                                const result = await RemoveAddressApi(item.id);
                                                const { code } = result;
                                                if (code !== 200) {
                                                    Toast.show(result.message);
                                                    return;
                                                };
                                                //删除成功
                                                Toast.show(t('message.delete_success'));
                                                getAdList();
                                            }}>
                                                <div className="address-content">
                                                    <div className="address-remark">
                                                        <p className="remark-text">
                                                            {item.comment}
                                                        </p>
                                                        <p className="remark-tag">
                                                            {item.protocol}
                                                        </p>
                                                    </div>
                                                    <p className="address-text">{item.address}</p>
                                                </div>
                                            </SwipeAction>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : <div className="load-list">
                            <DotLoading color='primary' />
                        </div>
            }


            <div className="add-address" onClick={() => { setAddBox(true) }}>
                <Button color="primary" block>
                    {/* 添加地址 */}
                    {t('public.add_address')}
                </Button>
            </div>
            <Popup visible={addBox} onMaskClick={() => { closePop() }}>
                <div className="add-content">
                    <p className="add-title">
                        {/* 添加地址 */}
                        {t('public.add_address')}
                        <span onClick={() => { closePop() }}><CloseOutline /></span>
                    </p>
                    <div className="inp-box">
                        <p className="inp-title">
                            {/* 可用网络 */}
                            {t('public.use_network')}
                            <Popover
                                content='Hello World'
                                trigger='click'
                                placement='top'
                            >
                                <span><QuestionCircleOutline /></span>
                            </Popover>
                        </p>
                        <div className="net-list">
                            <ul>

                                {
                                    netList.map((el, index): ReactElement => {
                                        return (
                                            <li key={index} className={`${defaultNet === el ? 'select-net' : ''}`} onClick={() => {
                                                setDefaultNet(el)
                                            }}>
                                                {el}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="inp-list">
                            <p className="inp-label">
                                {/* 地址 */}
                                {t('public.address')}
                            </p>
                            <input type="text" value={inpMsg.address} onChange={(e) => {
                                setInpMsg({
                                    ...inpMsg,
                                    address: e.target.value
                                });
                            }} placeholder={t('public.type_address')} />
                        </div>
                        <div className="inp-list">
                            <p className="inp-label">
                                {/* 备注 */}
                                {t('public.remark')}
                            </p>
                            <input type="text" value={inpMsg.remark} onChange={(e) => {
                                setInpMsg({
                                    ...inpMsg,
                                    remark: e.target.value
                                });
                            }} placeholder={t('public.type_address_remark')} />
                        </div>
                    </div>
                    <div className="submit-address">
                        <Button color="primary" block onClick={async () => {
                            if (!inpMsg.address) {
                                //请输入地址
                                Toast.show(t('message.type_address_sec'));
                                return
                            }
                            if (!inpMsg.remark) {
                                //请输入地址备注
                                Toast.show(t('message.type_address_remark'));
                                return;
                            };
                            const params = {
                                coin: store.getState().chainMsg.coin,
                                protocol: store.getState().chainMsg.protocol,
                                address: inpMsg.address,
                                comment: inpMsg.remark
                            };
                            const result = await AddAddressApi(params);
                            const { code } = result;
                            if (code !== 200) {
                                Toast.show(result.message);
                                return;
                            };
                            //保存成功
                            Toast.show(t('message.save_success'));
                            closePop();
                            getAdList();
                        }}>
                            {/* 保存 */}
                            {t('public.save')}
                        </Button>
                    </div>
                </div>
            </Popup>
        </div>
    )
};

export default AddressManage;