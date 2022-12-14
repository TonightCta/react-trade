import { ReactElement, ReactNode, useEffect, useState } from "react";
import store from "../../../../store";

interface Props {
    t: any,
    upMsg: {
        type: number,
        price: number,
        rate: number,
        precision?:number,
    }
}

const TesPriceMsg = (props: Props): ReactElement<ReactNode> => {
    const currentCoin = store.getState().currentCoin;
    return (
        <div className="tes-price-msg">
            <div className={`price-box msg-public ${props.upMsg.type === 1 ? 'up-color' : 'down-color'}`}>
                <p>{props.upMsg.price.toFixed(props.upMsg.precision)}</p>
                <p>{props.upMsg.type === 1 ? '+' : ''}{props.upMsg.rate.toFixed(2)}%</p>
            </div>
            <div className="price-high msg-public">
                <div className="high-public">
                    <p>
                        {/* 高 */}
                        {props.t('public.high')}
                    </p>
                    <p>{Number(currentCoin.yesterday_high).toFixed(4)}</p>
                </div>
                <div className="high-public">
                    <p>
                        {/* 低 */}
                        {props.t('public.low')}
                    </p>
                    <p>{Number(currentCoin.yesterday_low).toFixed(4)}</p>
                </div>
                <div className="high-public">
                    <p>24H{props.t('public.vol')}</p>
                    <p>{Number(currentCoin.yesterday_volume).toFixed(4)}</p>
                </div>
            </div>
        </div>
    )
};

export default TesPriceMsg;