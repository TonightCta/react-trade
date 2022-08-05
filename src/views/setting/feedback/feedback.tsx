import { ReactElement, ReactNode, useEffect } from "react";
import store from "../../../store";
import { upFooterStatus } from "../../../store/app/action_creators";
import InnerNav from '../../../components/inner_nav/nav'
import './index.scss'


const FeedBack = (): ReactElement<ReactNode> => {
    useEffect(() => {
        const action = upFooterStatus(0);
        store.dispatch(action);
    }, [])
    return (
        <div className="feed-back">
            <InnerNav leftArrow title="意见反馈"/>
        </div>
    )
};

export default FeedBack;