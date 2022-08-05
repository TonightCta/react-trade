import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../components/inner_nav/nav';
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import './index.scss'


const AuthCard = (): ReactElement<ReactNode> => {
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="auth-card">
            <InnerNav title="实名认证" leftArrow={true} />
        </div>
    )
};

export default AuthCard;