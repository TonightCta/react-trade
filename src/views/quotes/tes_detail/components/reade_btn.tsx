import { Button, Toast } from "antd-mobile";
import { StarFill, StarOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import store from "../../../../store";
import { useHistory } from "react-router-dom";
import { setQU, setTradeFrom, setTradeTo, upCurrentCoin } from "../../../../store/app/action_creators";
import { AddOptionalApi, QUList } from '../../../../request/api';


const TradeBtn = (props: { t: any }): ReactElement<ReactNode> => {
    const [isStar, setIsStar] = useState(store.getState().currentCoin);
    const history = useHistory();
    const moveTrasfer = () => {
        const currentCoin = store.getState().currentCoin;
        // const action = upDefaultCoin(currentCoin.coin);
        // const actionBase = upDefaultBaseCoin(currentCoin.symbol);
        const actionFrom = setTradeFrom(currentCoin.target);
        const actionTo = setTradeTo(currentCoin.base);
        // store.dispatch(action)
        // store.dispatch(actionBase)
        store.dispatch(actionFrom)
        store.dispatch(actionTo);
        history.push('/trade')
    };
    const storeChange = () => {
        store.subscribe(() => {
            setIsStar(store.getState().currentCoin)
        })
    }
    const setOptional = async (_type: string) => {
        const params = {
            qid: isStar.id,
            type: _type
        }
        const result = await AddOptionalApi(params);
        const { code } = result;
        if (code !== 200) {
            Toast.show(result.message);
            return;
        };
        if (_type === 'IN') {
            //添加自选成功
            Toast.show(props.t('message.add_optional'));
        } else {
            //取消自选成功
            Toast.show(props.t('message.cancel_optional'));
        };
        const list = await QUList();
        const arr: any[] = [];
        for (let i in list.data.list) {
            arr.push(list.data.list[i]);
        };
        const actionQU = setQU(arr);
        arr.forEach((e) => {
            if (e.symbol === isStar.symbol) {
                const action = upCurrentCoin(e);
                store.dispatch(action)
            }
        })
        store.dispatch(actionQU)
    }
    useEffect(() => {
        storeChange();
        return () => {
            storeChange();
            setIsStar(store.getState().currentCoin)
        }
    }, [])
    return (
        <div className="trade-btn">
            <Button className="buy-btn" onClick={() => {
                moveTrasfer()
            }}>
                {/* 买入 */}
                {props.t('public.buy_in')}
            </Button>
            <Button className="sell-btn" onClick={() => {
                moveTrasfer()
            }}>
                {/* 卖出 */}
                {props.t('public.sell_out')}
            </Button>
            <div className="star-box" onClick={() => { setOptional(isStar.collect != null ? 'OUT' : 'IN') }}>
                <p>
                    {
                        isStar.collect != null ? <StarFill color="#FFD94F" fontSize={20} /> : <StarOutline fontSize={20}/>
                    }
                </p>
                <p>{isStar.collect != null ? props.t('public.move_op') : props.t('public.push_op')}</p>
            </div>
        </div>
    )
};

export default TradeBtn;