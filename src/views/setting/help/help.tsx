import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import './index.scss'


const Help = (): ReactElement<ReactNode> => {
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, [])
    return (
        <div className="help-index">
            <InnerNav leftArrow title="帮助中心"/>
        </div>
    )
};
export default Help;