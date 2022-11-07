import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Tabs } from "antd-mobile";
import TesAllList from "./tes_all_list";
import { QUList } from '../../../request/api'
import { setGapTime, setQU } from "../../../store/app/action_creators";
import store from "../../../store";

interface Props {
    type: number,
    closeDraw?: () => void,
    t: any,
    base?: string
}
type TabsF = {
    name: string,
    key: string
}

interface TesMsg {
    coin: string,
    hourTotal: number,
    price: number,
    rate: number | string,
    type: number,
}

const TesTabs = (props: Props): ReactElement<ReactNode> => {
    const TabsList: Array<TabsF> = [
        {
            name: props.t('public.optional'),//自选
            key: 'COLLECTION',
        },
        {
            name: 'USDT',
            key: 'USDT',
        },
        {
            name: 'BTC',
            key: 'BTC',
        },
        {
            name: 'ETH',
            key: 'ETH',
        },
    ];
    const [currentTab, setCurrentTab] = useState<string>('USDT')
    const [TesListTwo, setTesListTwo] = useState<TesMsg[]>([]);
    const [dataTotal, setDataTotal] = useState<number>(1);
    const DataList = async (_val?: string) => {
        const gap = Date.now() - store.getState().gapTime;
        if (store.getState().gapTime === 0 || gap > 60000) {
            const action = setGapTime(new Date().getTime());
            store.dispatch(action)
        };
        const result = (gap > 60000 || _val !== 'USDT') ? await QUList(_val ? _val : currentTab) : {
            data: {
                list: store.getState().quList
            }
        };
        const arr = [];
        const backResult: any[] = result.data.list;
        for (let i in backResult) {
            if (backResult[i].status === 1) {
                arr.push(backResult[i])
            }
        };
        if (gap > 60000) {
            const actionQU = setQU(arr);
            store.dispatch(actionQU);
        }
        setDataTotal(arr.length);
        // arr = [...arr,...arr]
        setTesListTwo(arr.map(item => {
            const rate = (item.price - item.yesterday_price) / item.yesterday_price * 100
            return {
                ...item,
                coin: `${item.base}/${item.target}`,
                hourTotal: Number(item.yesterday_volume).toFixed(2),
                rate: rate.toFixed(2),
                type: rate > 0 ? 1 : 0,
            }
        }));
    };
    useEffect(() => {
        DataList('USDT');
        return () => {
            setDataTotal(0);
            setTesListTwo([]);
        }
    }, [])
    return (
        <div className="tes-tabs">
            <Tabs activeKey={currentTab} onChange={(val: string) => {
                setCurrentTab(val);
                DataList(val);
            }} style={{ '--title-font-size': '14px' }}>
                {
                    TabsList.map((el): ReactElement => {
                        return (
                            <Tabs.Tab title={el.name} key={el.key}></Tabs.Tab>
                        )
                    })
                }
            </Tabs>
            <TesAllList data={TesListTwo} base={props.base} total={dataTotal} closeDraw={props.closeDraw} type={Number(props.type)} />
        </div>
    )
};

export default TesTabs;