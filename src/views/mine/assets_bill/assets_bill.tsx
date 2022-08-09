import { ReactElement, ReactNode, useEffect, useState } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import { PullToRefresh } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep';
import { useTranslation } from "react-i18next";
import './index.scss'

const billList = [
    {
        type: 1,
        balance: 219.3644,
        coin: 'BTC',
        date: '2022-10-12  12:12:11',
        fee: '1.25536',
        amount: 1.2541122,
    },
    {
        type: 3,
        balance: 1019.3644,
        coin: 'ETH',
        date: '2022-10-12  12:12:11',
        fee: '1.25536',
        amount: 1.2541122,
    },
    {
        type: 2,
        balance: 219.3644,
        coin: 'USDT',
        date: '2022-10-12  12:12:11',
        fee: '1.25536',
        amount: 1.2541122,
    },
    {
        type: 4,
        balance: 12219.3644,
        coin: 'TRX',
        date: '2022-10-12  12:12:11',
        fee: '1.25536',
        amount: -9091.122,
    },
]

const AssetsBill = (): ReactElement<ReactNode> => {
    const { t } = useTranslation();
    const [searchVal, setSearchVal] = useState<string>('');
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, []);
    useEffect((): void => {
        console.log(searchVal)
    }, [searchVal])
    return (
        <div className="assets-bill">
            <InnerNav title={t('public.bill_list')} search withBorder leftArrow getSearchVal={(val: string) => {
                setSearchVal(val)
            }} />
            <div className="bill-list">
                <PullToRefresh onRefresh={async () => {
                    await sleep(1000)
                }}>
                    <ul>
                        {
                            billList.map((el, index): ReactElement => {
                                return (
                                    <li key={index} className={`
                                    ${el.type === 1 && 'buy-color' ||
                                        el.type === 2 && 'sell-color' ||
                                        el.type === 3 && 'charged-color' ||
                                        el.type === 4 && 'withdraw-color'
                                        }`}>
                                        <p className="icon-type">{el.coin}</p>
                                        <div className="order-title">
                                            <p className="order-type">{[
                                                // 购买
                                                el.type === 1 && t('public.buy') ||
                                                // 售出
                                                el.type === 2 && t('public.sell') ||
                                                // 充币
                                                el.type === 3 && t('public.recharge') ||
                                                //提币
                                                el.type === 4 && t('public.withdraw')
                                            ]}</p>
                                            <p className="now-balance">{el.balance}</p>
                                        </div>
                                        <div className="fee-msg">
                                            <p className="order-date">{el.date}</p>
                                            <div className="fee-and-amount">
                                                {/* 手续费 */}
                                                <p>({t('public.fee')}:&nbsp;{el.fee})</p>
                                                <p>{el.amount > 0 ? '+' : ''}{el.amount}</p>
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
    )
};

export default AssetsBill;