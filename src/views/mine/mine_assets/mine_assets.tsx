import { Button, PullToRefresh, DotLoading, Popup } from "antd-mobile";
import { CheckCircleFill, RightOutline, SearchOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import { upBillCoin } from "../../../store/app/action_creators";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { computedAssets, upUserAssets } from "../../../store/app/action_fn";
import { UserAssetsApi, UserInfoApi } from '../../../request/api'
import './index.scss'
import { PullStatus } from "antd-mobile/es/components/pull-to-refresh";

interface Data {
    coin: string,
    logo: string,
    available: number,
    freeze: number
}

const MineAssets = (): ReactElement<ReactNode> => {
    const [assetsList, setAssetsList] = useState<Data[]>([]);
    const [localUse, selocalUse] = useState<Data[]>([]);
    const [isZroe, setIsZroe] = useState<number>(0);
    const [account, setAccount] = useState(store.getState().account);
    const [owneAmount,setOwneAmount] = useState<number>(0)
    const [rechargePopup, setRechargePopup] = useState<boolean>(false);
    const [withDrawPopup, setWithdrawPopup] = useState<boolean>(false);
    const getAssetsList = useCallback(async () => {
        const result = await UserAssetsApi();
        const arr = [];
        for (let i in result.data) {
            arr.push(result.data[i])
        };
        assetsList.length < 1 && setAssetsList(arr.map(item => { return item }));
        selocalUse(arr.map(item => { return item }));
    }, []);
    const [assets, setAssets] = useState<number>(store.getState().assets);
    const storeChange = () => {
        store.subscribe(() => {
            setAssets(store.getState().assets)
        })
    }
    //搜索值
    const [searchCoin, setSearchCoin] = useState<any>();
    // 筛选币种
    useEffect(() => {
        const startFilter = () => {
            const arr = assetsList;
            const filterL: Data[] = [];
            arr.map((item: Data) => {
                if (item.coin.toLocaleLowerCase().search(searchCoin) != -1) {
                    filterL.push(item)
                }
            });
            setAssetsList(filterL)
        }
        searchCoin ? startFilter() : setAssetsList(localUse)
    }, [searchCoin]);
    //隐藏0币种
    useEffect(() => {
        const startFilter = () => {
            const arr = assetsList;
            const filterL: Data[] = [];
            arr.map(item => {
                if (item.available !== 0) {
                    filterL.push(item)
                }
            });
            setAssetsList(filterL);
        }
        isZroe == 1 ? startFilter() : setAssetsList(localUse)
    }, [isZroe]);

    const { t } = useTranslation();

    const history = useHistory();
    // upUserInfo
    const upUserInfo = async () => {
        const result = await UserInfoApi();
        setAccount(result.data);
        account.experience && setOwneAmount(await computedAssets(account.experience.assets));
    }
    useEffect(() => {
        getAssetsList();
        upUserAssets();
        storeChange();
        upUserInfo();
        return () => {
            setAssetsList([]);
            selocalUse([]);
            setIsZroe(0);
            setAccount(store.getState().account);
            setOwneAmount(0)
        }
    }, []);
    const statusRecord: Record<PullStatus, ReactElement | string> = {
        pulling: t('public.pull_down'),//下拉刷新
        canRelease: t('public.freed_down'),//释放刷新
        refreshing: <DotLoading color='primary' />,
        complete: t('public.down_over'),//刷新完成
    }
    return (
        <div className="mine-assets">
            <InnerNav owneMine={ account.experience ? true : false } owneAmount={account.experience ? owneAmount : 0} backMine title={t('public.assets')} />
            <div className={`assets-overview ${account.experience ? 'has-owne' : ''}`}>
                <div className="view-msg">
                    {/* 总资产约 */}
                    <p>{t('public.assets_total_un')} ({t('public.for_u')}USDT)</p>
                    <p>{assets}</p>
                </div>
                <div className="view-oper">
                    <Button color="primary" onClick={() => {
                        // history.push('/recharge')
                        setRechargePopup(true)
                    }}>
                        {/* 充值 */}
                        {t('public.recharge_fiat')}
                    </Button>
                    <Button color="default" onClick={() => {
                        // history.push('/withdraw')
                        setWithdrawPopup(true)
                    }}>
                        {/* 提现 */}
                        {t('public.withdraw_fiat')}
                    </Button>
                </div>
            </div>
            <div className="assets-list-box">
                {/* <Tabs style={{ '--title-font-size': '14px' }}>
                    币币账户
                    <Tabs.Tab title={t('public.coin_account')} key={0}></Tabs.Tab>
                    永续账户
                    <Tabs.Tab title={t('public.ever_account')} key={1}></Tabs.Tab>
                </Tabs> */}
                <div className="search-oper">
                    <p>
                        <span><SearchOutline color="#999" fontSize={14} /></span>
                        <input type="text" value={searchCoin} onChange={(e) => {
                            setSearchCoin(e.target.value)
                        }} placeholder={t('public.search_assets')} />
                    </p>
                    <p onClick={() => {
                        setIsZroe(isZroe == 0 ? 1 : 0)
                    }}>
                        <CheckCircleFill color={isZroe == 0 ? '#999' : '#3070ff'} fontSize={14} />
                        <span>
                            {/* 隐藏为0的币种 */}
                            {t('public.hidden_0')}
                        </span>
                    </p>
                </div>
                <div className="list-con">
                    {assetsList.length > 0
                        ? <PullToRefresh
                            onRefresh={async () => {
                                await getAssetsList()
                            }}
                            renderText={status => {
                                return <div>{statusRecord[status]}</div>
                            }}
                        >
                            <ul>
                                {
                                    assetsList.map((el: Data, index: number): ReactElement => {
                                        return (
                                            <li key={index} onClick={() => {
                                                const action = upBillCoin(el.coin);
                                                store.dispatch(action);
                                                history.push('/assets-bill')
                                            }}>
                                                <div className="coin-msg">
                                                    <p>
                                                        <img src={el.logo} alt="" />
                                                        <span>{el.coin}</span>
                                                    </p>
                                                    <RightOutline color="#999" />
                                                </div>
                                                <div className="use-happen">
                                                    <div className="happen-public">
                                                        <p>
                                                            {/* 可用 */}
                                                            {t('public.use')}
                                                        </p>
                                                        <p>{el.available?.toFixed(4)}</p>
                                                    </div>
                                                    <div className="happen-public">
                                                        <p>
                                                            {/* 冻结 */}
                                                            {t('public.freeze')}
                                                        </p>
                                                        <p>{el.freeze?.toFixed(4)}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </PullToRefresh>
                        : <div className="load-list">
                            <DotLoading color='primary' />
                        </div>
                    }
                </div>
            </div>
            {/* Select Recharge Way */}
            <Popup visible={rechargePopup} onMaskClick={() => { setRechargePopup(false) }}>
                <div className="recharge-popup" onClick={() => { setRechargePopup(false) }}>
                    <ul>
                        <li onClick={() => { history.push('/recharge-fait') }}>
                            {/* 法币充值 */}
                            {t('public.recharge_fait')}
                        </li>
                        <li onClick={() => { history.push('/recharge') }}>
                            {/* 链上充值 */}
                            {t('public.recharge_protocol')}
                        </li>
                        <li>
                            {/* 取消 */}
                            {t('public.cancel')}
                        </li>
                    </ul>
                </div>
            </Popup>
            {/* Select Withdraw Way */}
            <Popup visible={withDrawPopup} onMaskClick={() => { setWithdrawPopup(false) }}>
                <div className="recharge-popup" onClick={() => { setWithdrawPopup(false) }}>
                    <ul>
                        <li onClick={() => { history.push('/withdraw-fait') }}>
                            {/* 法币充值 */}
                            {t('public.fait_withdraw')}
                        </li>
                        <li onClick={() => { history.push('/withdraw') }}>
                            {/* 链上提币 */}
                            {t('public.protocol_withdraw')}
                        </li>
                        <li>
                            {/* 取消 */}
                            {t('public.cancel')}
                        </li>
                    </ul>
                </div>
            </Popup>
        </div>
    )
};

export default MineAssets;