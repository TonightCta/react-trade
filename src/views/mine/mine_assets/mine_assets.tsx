import { Button, Tabs, PullToRefresh } from "antd-mobile";
import { sleep } from 'antd-mobile/es/utils/sleep'
import { CheckCircleFill, RightOutline, SearchOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserAssetsApi } from '../../../request/api'
import './index.scss'

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
    const getAssetsList = useCallback(async () => {
        const result = await UserAssetsApi();
        const arr = [];
        for (let i in result.data) {
            arr.push(result.data[i])
        };
        assetsList.length < 1 && setAssetsList(arr.map(item => { return item }))
        selocalUse(arr.map(item => { return item }))
    }, []);
    const name = 1;
    const assets = store.getState().assets;
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

    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action);
        getAssetsList();
        return () => {
            setAssetsList([]);
            selocalUse([]);
            setIsZroe(0)
        }
    }, []);

    return (
        <div className="mine-assets">
            <InnerNav backMine title="我的资产" />
            <div className="assets-overview">
                <div className="view-msg">
                    {/* 总资产约 */}
                    <p>{t('public.assets_total_un')} ({t('public.for_u')}USDT)</p>
                    <p>{assets}</p>
                </div>
                <div className="view-oper">
                    <Button color="primary" onClick={() => { history.push('/recharge') }}>
                        {/* 充值 */}
                        {t('public.recharge_fiat')}
                    </Button>
                    <Button color="default" onClick={() => { history.push('/withdraw') }}>
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
                    <PullToRefresh
                        onRefresh={async () => {
                            await sleep(1000)
                        }}
                    >
                        <ul>
                            {
                                assetsList.map((el: Data, index: number): ReactElement => {
                                    return (
                                        <li key={index} onClick={() => {
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

                </div>
            </div>
        </div>
    )
};

export default MineAssets;