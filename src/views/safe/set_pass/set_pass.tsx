import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import ResetPass from "./components/re_set";
import './index.scss'

const SetPass = (): ReactElement<ReactNode> => {
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action);
    }, [])
    return (
        <div className="set-pass">
            <InnerNav title="登录密码" leftArrow />
            <ResetPass/>
        </div>
    )
};

export default SetPass;