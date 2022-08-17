import { CloseCircleOutline, FilterOutline, HistogramOutline, StarOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useState } from "react";
import { Popup } from 'antd-mobile';
import TesTabs from "../../quotes/components/tes_tabs";
import store from '../../../store/index'
import { QUList } from '../../../request/api'
import { setUnCoin, upCurrency, upCurrentCoin } from "../../../store/app/action_creators";
import { useHistory } from 'react-router-dom';
import { sendWs } from '../../../utils/ws'

interface DrawProps {
    closeDraw: () => void,
    t: any,
    base: string

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
                <HistogramOutline onClick={() => {
                    const result = store.getState().quList;
                    result.forEach(e => {
                        if (props.coinMsg.base == e.symbol) {
                            const action = upCurrentCoin(e);
                            const actionC = upCurrency(store.getState().defaultCoin);
                            const actionUn = setUnCoin(sessionStorage.getItem('defaultBaseCoin') || '');
                            store.dispatch(action);
                            store.dispatch(actionC);
                            store.dispatch(actionUn);
                            history.push('/quotes-detail')
                        }
                    })
                    // history.push('/quotes-detail')
                    // console.log(123)
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