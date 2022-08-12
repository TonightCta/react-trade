import { CloseCircleOutline, FilterOutline, HistogramOutline, StarOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useState } from "react";
import { Popup } from 'antd-mobile';
import TesTabs from "../../quotes/components/tes_tabs";
import store from '../../../store/index'
import { QUList } from '../../../request/api'
import { upCurrency, upCurrentCoin } from "../../../store/app/action_creators";
import { useHistory } from 'react-router-dom';
import { sendWs } from '../../../utils/ws'

interface DrawProps {
    closeDraw: () => void,
    t: any,
    base:string

};

interface Props {
    t: any,
    coinMsg: {
        coin: string,
        base: string
    }
}

const FilterDraw = (props: DrawProps): ReactElement => {
    return (
        <div className="trade-filter-draw">
            <div className="draw-title">
                <p>{props.t('public.shop')}</p>
                <CloseCircleOutline onClick={() => {
                    props.closeDraw();
                }} />
            </div>
            <TesTabs t={props.t} type={2} base={props.base} closeDraw={props.closeDraw} />
        </div>
    )
}

const TradeNav = (props: Props): ReactElement<ReactNode> => {

    const history = useHistory();

    const [drawStatus, setDrawStatus] = useState<boolean>(false);

    return (
        <div className="trade-nav">
            <div className="left-oper">
                <FilterOutline fontSize={22} onClick={() => {
                    setDrawStatus(true)
                }} />
                <p>{props.coinMsg.coin}</p>
            </div>
            <div className="right-oper">
                <StarOutline fontSize={22} />
                <span></span>
                <HistogramOutline onClick={async () => {
                    const result = await QUList();
                    for (let i in result.data.list) {
                        if (props.coinMsg.base === result.data.list[i].symbol) {
                            const action = upCurrentCoin(result.data.list[i]);
                            const actionC = upCurrency(store.getState().defaultCoin);
                            store.dispatch(action);
                            store.dispatch(actionC);
                            history.push('/quotes-detail')
                        }
                    }
                }} fontSize={22} />
            </div>
            {/* 选项弹出层 */}
            <Popup visible={drawStatus}
                onMaskClick={() => {
                    setDrawStatus(false)
                }}
                position='left'
                bodyStyle={{ minWidth: '80vw' }}>
                <FilterDraw t={props.t} base={props.coinMsg.base} closeDraw={(): void => {
                    setDrawStatus(false)
                }} />
            </Popup>
        </div>
    )
};

export default TradeNav;