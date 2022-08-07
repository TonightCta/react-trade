import { CloseCircleOutline, FilterOutline, HistogramOutline, StarOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useState } from "react";
import { Popup } from 'antd-mobile';
import TesTabs from "../../quotes/components/tes_tabs";

interface DrawProps {
    closeDraw: () => void,
}
const FilterDraw = (props: DrawProps): ReactElement => {
    return (
        <div className="trade-filter-draw">
            <div className="draw-title">
                <p>商城</p>
                <CloseCircleOutline onClick={() => {
                    props.closeDraw();
                }}/>
            </div>
            <TesTabs type={2} closeDraw={props.closeDraw}/>
        </div>
    )
}

const TradeNav = (): ReactElement<ReactNode> => {
    const [drawStatus, setDrawStatus] = useState<boolean>(false);
    return (
        <div className="trade-nav">
            <div className="left-oper">
                <FilterOutline fontSize={22} onClick={() => {
                    setDrawStatus(true)
                }} />
                <p>BTC/USDT</p>
            </div>
            <div className="right-oper">
                <StarOutline fontSize={22} />
                <span></span>
                <HistogramOutline fontSize={22} />
            </div>
            {/* 选项弹出层 */}
            <Popup visible={drawStatus}
                onMaskClick={() => {
                    setDrawStatus(false)
                }}
                position='left'
                bodyStyle={{ minWidth: '80vw' }}>
                <FilterDraw closeDraw={() : void => {
                    setDrawStatus(false)
                }} />
            </Popup>
        </div>
    )
};

export default TradeNav;