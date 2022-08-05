import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../store";
import { upFooterStatus } from "../../store/app/action_creators";
import './index.scss'

const LoginIndex = (): ReactElement<ReactNode> => {
    useEffect((): void => {
        const aciton = upFooterStatus(0);
        store.dispatch(aciton)
    }, [])
    return (
        <div className="login-index">
            登陆
        </div>
    )
};

export default LoginIndex;