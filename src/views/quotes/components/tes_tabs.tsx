import { ReactElement, ReactNode, useState } from "react";
import { Tabs } from "antd-mobile";
import TesAllList from "./tes_all_list";

interface Props{
    type:string | number,
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
    type: number
}
const TabsList: Array<TabsF> = [
    {
        name: '自选',
        key: 'mine',
    },
    {
        name: 'USDT',
        key: 'usdt',
    },
    {
        name: 'BTC',
        key: 'btc',
    },
    {
        name: 'ETH',
        key: 'eth',
    },
];
const TesListTwo: Array<TesMsg> = [
    {
        coin: 'LINK/USDT',
        hourTotal: 117942431.4324,
        price: 7.5333,
        rate: 3.42,
        type: 1,
    },
    {
        coin: 'OMG/USDT',
        hourTotal: 74054191.9941,
        price: 2.2122,
        rate: 1.99,
        type: 1,
    },
    {
        coin: 'XMR/USDT',
        hourTotal: 973129.6788,
        price: 161.201,
        rate: 1.68,
        type: 0,
    },
    {
        coin: 'EOS/USDT',
        hourTotal: 114702681.3521,
        price: 136.65,
        rate: 1.66,
        type: 1,
    },
    {
        coin: 'NEO/USDT',
        hourTotal: 125181923.0395,
        price: 0.507001,
        rate: 1.33,
        type: 1,
    },
];

const TesTabs = (props:Props): ReactElement<ReactNode> => {
    const [currentTab, setCurrentTab] = useState<string>('usdt');
    const chagngeTab = (val: string) => {
        setCurrentTab(val)
    }
    return (
        <div className="tes-tabs">
            <Tabs activeKey={currentTab} onChange={(val: string) => {
                chagngeTab(val)
            }} style={{ '--title-font-size': '14px' }}>
                {
                    TabsList.map((el): ReactElement => {
                        return (
                            <Tabs.Tab title={el.name} key={el.key}></Tabs.Tab>
                        )
                    })
                }
            </Tabs>
            <TesAllList data={TesListTwo} type={props.type} />
        </div>
    )
};

export default TesTabs;