import { CloseCircleOutline, FilterOutline, HistogramOutline, StarFill, StarOutline } from "antd-mobile-icons";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Popup, Toast } from 'antd-mobile';
import TesTabs from "../../quotes/components/tes_tabs";
import { Store } from '../../../store/app/reducer'
import store from '../../../store/index'
// import { QUList } from '../../../request/api'
// import { setUnCoin, upCurrency, upCurrentCoin } from "../../../store/app/action_creators";
import { useHistory } from 'react-router-dom';
import { AddOptionalApi, QUList } from '../../../request/api'
import { setQU, upCurrentCoin } from "../../../store/app/action_creators";
// import { sendWs } from '../../../utils/ws'

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
    const [state, setState] = useState<any>(store.getState());
    const storeChange = () => {
        store.subscribe(() => {
            setState(store.getState())
        })
    };
    useEffect(() => {
        storeChange();
        return () => {
            storeChange();
            setState({});
        }
    }, []);
    //添加 ｜ 取消 自选
    const addOptional = async (_id: number, _type: string) => {
        const params = {
            qid: _id,
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
            if (e.symbol === state.currentCoin.symbol) {
                const action = upCurrentCoin(e);
                store.dispatch(action)
            }
        })
        store.dispatch(actionQU)
    }
    return (
        <div className="trade-nav">
            <div className="left-oper">
                <FilterOutline fontSize={22} onClick={() => {
                    setDrawStatus(true)
                }} />
                <p>{props.coinMsg.coin}</p>
            </div>
            <div className="right-oper">
                {state.currentCoin.collect != null
                    ? <StarFill fontSize={22} color="#FFD94F" onClick={() => {
                        addOptional(state.currentCoin.id, 'OUT')
                    }} />
                    : <StarOutline fontSize={22} onClick={async () => {
                        // console.log(store.getState().defaultCoinID);
                        addOptional(state.currentCoin.id, 'IN')
                    }} />
                }
                <span></span>
                <HistogramOutline onClick={() => {
                    const result = store.getState().quList;
                    result.forEach(e => {
                        if (props.coinMsg.base == e.symbol) {
                            // const action = upCurrentCoin(e);
                            // const actionC = upCurrency(store.getState().defaultCoin);
                            // const actionUn = setUnCoin(sessionStorage.getItem('defaultBaseCoin') || '');
                            // store.dispatch(action);
                            // store.dispatch(actionC);
                            // store.dispatch(actionUn);
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