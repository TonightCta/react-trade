import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav';
import './index.scss'

const SetLanguage = (): ReactElement<ReactNode> => {
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action);
    }, [])
    return (
        <div className="set-language">
            <InnerNav title="语言设置" leftArrow />
        </div>
    )
};

export default SetLanguage;