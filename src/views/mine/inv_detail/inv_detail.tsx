import { ReactElement, ReactNode, useEffect } from "react";
import InnerNav from '../../../components/inner_nav/nav'
import store from "../../../store";
import './index.scss'
import { upFooterStatus } from "../../../store/app/action_creators";

const InvDetail = (): ReactElement<ReactNode> => {
    useEffect((): void => {
        const action = upFooterStatus(0);
        store.dispatch(action)
    }, []);
    const level = store.getState().invLevel;
    return (
        <div className="inv-detail">
            <InnerNav leftArrow={true} title="详细信息" withBorder={true} />
            <div className="white-content">
                <p className="level-title">
                    Level&nbsp;{level === 4 ? 'Total' : level}&nbsp;-&nbsp;详细信息
                </p>
                <div className="inv-msg">
                    <p>受邀者总数</p>
                    <p><span>0</span>人</p>
                </div>
                <p className="inv-date">截止至&nbsp;2022/8/4 16:54:13</p>
            </div>
        </div>
    )
};

export default InvDetail;