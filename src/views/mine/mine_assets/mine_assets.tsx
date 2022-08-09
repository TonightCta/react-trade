import { Button, Tabs, PullToRefresh } from "antd-mobile";
import { sleep } from 'antd-mobile/es/utils/sleep'
import { CheckCircleFill, RightOutline, SearchOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './index.scss'

const testList = [
    {
        coin: 'USDT',
        logo: require('../../../assets/images/test.png'),
        use: 1.2541122,
        freeze: 0.123323,
    },
    {
        coin: 'ETH',
        logo: require('../../../assets/images/test.png'),
        use: 1.2541122,
        freeze: 0.123323,
    },
    {
        coin: 'BTC',
        logo: require('../../../assets/images/test.png'),
        use: 1.2541122,
        freeze: 0.123323,
    },
]

const MineAssets = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const history = useHistory();
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="mine-assets">
            <InnerNav backMine title="我的资产" />
            <div className="assets-overview">
                <div className="view-msg">
                    {/* 总资产约 */}
                    <p>{t('public.assets_total_un')} ({t('public.for_u')}USDT)</p>
                    <p>1.5525266447</p>
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
                <Tabs style={{ '--title-font-size': '14px' }}>
                    {/* 币币账户 */}
                    <Tabs.Tab title={t('public.coin_account')} key={0}></Tabs.Tab>
                    {/* 永续账户 */}
                    <Tabs.Tab title={t('public.ever_account')} key={1}></Tabs.Tab>
                </Tabs>
                <div className="search-oper">
                    <p>
                        <span><SearchOutline color="#999" fontSize={14} /></span>
                        <input type="text" placeholder={t('public.search_assets')} />
                    </p>
                    <p>
                        <CheckCircleFill color="#999" fontSize={14} />
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
                                testList.map((el, index): ReactElement => {
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
                                                    <p>{el.use}</p>
                                                </div>
                                                <div className="happen-public">
                                                    <p>
                                                        {/* 冻结 */}
                                                        {t('public.freeze')}
                                                    </p>
                                                    <p>{el.use}</p>
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