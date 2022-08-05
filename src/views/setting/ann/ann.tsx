import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav';
import './index.scss'

const Ann = (): ReactElement<ReactNode> => {
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="ann-index">
            <InnerNav leftArrow title="公告中心"/>
        </div>
    )
};

export default Ann;