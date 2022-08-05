import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../components/inner_nav/nav';
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import './index.scss'
import SetLock from "./components/set_lock";

const AssetsLock = (): ReactElement<ReactNode> => {
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="assets-lock">
            <InnerNav leftArrow title="资金密码" />
            <SetLock/>
        </div>
    )
};

export default AssetsLock;