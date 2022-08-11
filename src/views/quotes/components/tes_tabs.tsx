import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Tabs } from "antd-mobile";
import TesAllList from "./tes_all_list";
import { QUList } from '../../../request/api'

interface Props {
    type: number,
    closeDraw?: () => void,
    t: any,
    base?:string
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
            key: 'mine',
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
        const result = await QUList(_val ? _val : currentTab);
        const arr = [];
        for (let i in result.data.list) {
            arr.push(result.data.list[i])
        };
        setDataTotal(result.data.total);
        setTesListTwo(arr.map(item => {
            const rate = (item.price - item.yesterday_price) / item.yesterday_price * 100
            return {
                ...item,
                coin: `${item.base}/${item.target}`,
                hourTotal: item.yesterday_volume.toFixed(2),
                rate: rate.toFixed(2),
                type: rate > 0 ? 1 : 0,
            }
        }));
    };
    useEffect(() => {
        DataList()
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