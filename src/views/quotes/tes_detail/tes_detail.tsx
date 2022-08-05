import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav';
import './index.scss'


const TesDetail = (): ReactElement<ReactNode> => {
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="tes-detail">
            <InnerNav leftArrow title="BTC/USDT"/>
        </div>
    )
};

export default TesDetail;