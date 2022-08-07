import { ReactElement, ReactNode } from "react";


const dealList: number[] = [1,2,3,4,5,6,7,8,9,10,10,12,13,14,15,16,17,18,19,19];
const TesDealMsg = (): ReactElement<ReactNode> => {
    return (
        <div className="tes-deal-msg">
            <p className="deal-title">成交单</p>
            <ul className="deal-list">
                <li>
                    <p className="deal-date">时间</p>
                    <div className="deal-cen">
                        <p>方向</p>
                        <p>价格</p>
                    </div>
                    <p className="deal-num">数量</p>
                </li>
            </ul>
            <ul>
                {
                    dealList.map((el, index): ReactElement => {
                        return (
                            <li key={index}>
                                <p className="deal-date">15:25:12</p>
                                <div className="deal-cen">
                                    <p className={`cen-type ${el % 2 === 0 ? 'buy-color' : 'sell-color'}`}>
                                        { el % 2 === 0 ? '买入' : '卖出' }
                                    </p>
                                    <p>140.43</p>
                                </div>
                                <p className="deal-num">199.434248</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

export default TesDealMsg;