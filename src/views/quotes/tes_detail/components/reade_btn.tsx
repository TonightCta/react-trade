import { Button } from "antd-mobile";
import { StarFill, StarOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useState } from "react";
import store from "../../../../store";
import { useHistory } from "react-router-dom";
import { setTradeFrom, setTradeTo, upDefaultBaseCoin, upDefaultCoin } from "../../../../store/app/action_creators";


const TradeBtn = (props: { t: any }): ReactElement<ReactNode> => {
    const [isStar, setIsStar] = useState<number>(0);
    const history = useHistory();
    const moveTrasfer = () => {
        const currentCoin = store.getState().currentCoin;
        const action = upDefaultCoin(currentCoin.coin);
        const actionBase = upDefaultBaseCoin(currentCoin.symbol);
        const actionFrom = setTradeFrom(currentCoin.target);
        const actionTo = setTradeTo(currentCoin.base);
        store.dispatch(action)
        store.dispatch(actionBase)
        store.dispatch(actionFrom)
        store.dispatch(actionTo);
        history.push('/trade')
    }
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
            <div className="star-box" onClick={() => { setIsStar(isStar === 0 ? 1 : 0) }}>
                <p>
                    {
                        isStar === 0 ? <StarOutline /> : <StarFill color="#3070ff" />
                    }
                </p>
                <p>{isStar === 0 ? props.t('public.push_op') : props.t('public.move_op')}</p>
            </div>
        </div>
    )
};

export default TradeBtn;