import { Button } from "antd-mobile";
import { StarFill, StarOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useState } from "react";


const TradeBtn = (props: { t: any }): ReactElement<ReactNode> => {
    const [isStar, setIsStar] = useState<number>(0);
    return (
        <div className="trade-btn">
            <Button className="buy-btn">
                {/* 买入 */}
                {props.t('public.buy_in')}
            </Button>
            <Button className="sell-btn">
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